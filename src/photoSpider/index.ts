import {
    PhotoIndexAnylyzer,
    PhotoOneTypeAnylyzer,
    PhotoOnePageAnylyzer,
    PhotoDetailPageAnylyzer,
} from './photoAnylyzers';
import Spider from '../spider';
import { rootPath } from './config';
const path = require('path');
const fs = require('fs-extra');
import { download } from './download';

const parseIndex = async (url: string) => {
    const photoIndexAnylyzer = new PhotoIndexAnylyzer();
    const mySpider = new Spider(photoIndexAnylyzer);
    return await mySpider.get(url);
};

const parsePicPage = async (url: string, type: string, name: string) => {
    const picsPath = path.resolve(rootPath, type, name);
    await fs.ensureDir(picsPath);

    const photoDetailPageAnylyzer = new PhotoDetailPageAnylyzer();
    let nowUrl = url;
    let index = 1;
    while (true) {
        const mySpider = new Spider(photoDetailPageAnylyzer);
        console.log(`单签采集详情页:${nowUrl}`);
        const { imgUrls, nextUrl } = await mySpider.get(nowUrl);
        if (!imgUrls || !nextUrl) {
            continue;
        }
        for (let i = 0; i < imgUrls.length; i++) {
            const imgUrl = imgUrls[i];
            const filePath = path.resolve(picsPath, index + '.jpg');
            //download
            console.log(nextUrl);
            console.log(imgUrl.replace('https://', 'http://'));
            console.log(filePath);
            const exist = await fs.pathExists(filePath);
            if (!exist) {
                await download(imgUrl.replace('https://', 'http://'), filePath);
            }
            index++;
        }

        if (nextUrl.indexOf('html') != -1) {
            const endTag = nowUrl.substring(nowUrl.lastIndexOf('/') + 1);
            nowUrl = nowUrl.replace(endTag, nextUrl);
        } else {
            break;
        }
    }
};

const parseOnePage = async (url: string, type: string) => {
    // const pagePath = path.resolve(rootPath, type);
    // await fs.ensureDir(pagePath);
    const photoOnePathAnylyzer = new PhotoOnePageAnylyzer();
    const mySpider = new Spider(photoOnePathAnylyzer);
    console.log(`套图分页url:${url}`);
    const picPageArray = await mySpider.get(url);
    for (let i = 0; i < picPageArray.length; i++) {
        const { picUrl, name } = picPageArray[i];
        const picsPath = path.resolve(rootPath, type, name);
        const exist = await fs.pathExists(picsPath);
        if (!exist) {
            await parsePicPage(`https://www.tupianzj.com${picUrl}`, type, name);
        }
    }
};

const parseOneType = async (url: string, type: string) => {
    const photoOneTypeAnylyzer = new PhotoOneTypeAnylyzer();
    const mySpider = new Spider(photoOneTypeAnylyzer);
    const { typeIndex, total } = await mySpider.get(url);
    for (let i = 1; i <= +total; i++) {
        const pageUrl = `${url}list_${typeIndex}_${i}.html`;
        await parseOnePage(pageUrl, type);
    }
};

export default {
    async beginSpider() {
        const indexUrlList = await parseIndex(
            'https://www.tupianzj.com/meinv/xiezhen/'
        );
        for (let i = 0; i < indexUrlList.length; i++) {
            const { url, type } = indexUrlList[i];
            parseOneType(url, type);
        }
    },
};
