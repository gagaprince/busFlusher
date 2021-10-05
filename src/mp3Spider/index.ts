import { Mp3IndexAnylyzer, Mp3DetailAnylyzer } from './mp3Anylyzers';
import Spider from '../spider';
const path = require('path');
const fs = require('fs-extra');
import { download } from './download';

const parseIndex = async (url: string) => {
    const mp3IndexAnylyzer = new Mp3IndexAnylyzer();
    const mySpider = new Spider(mp3IndexAnylyzer);
    return await mySpider.get(url);
};

const parseMp3Detail = async (url: string) => {
    const mp3DetailAnylyzer = new Mp3DetailAnylyzer();
    const mySpider = new Spider(mp3DetailAnylyzer);
    return await mySpider.get(url);
};

const downloadMp3 = async (url: string, filePath: string) => {
    // const filePath = path.resolve(picsPath, index + '.jpg');
    //download
    const exist = await fs.pathExists(filePath);
    if (!exist) {
        await download(url, filePath);
    }
};

const rootPath = path.resolve(process.cwd(), 'mp3');

export default {
    async beginSpider() {
        const mp3UrlList = await parseIndex(
            'https://www.9ku.com/douyin/bang.htm'
        );
        for (let i = 0; i < mp3UrlList.length; i++) {
            const mp3Link = `https://www.9ku.com${mp3UrlList[i].sourceUrl}`;
            const mp3Data = await parseMp3Detail(mp3Link);
            const mp3Url = mp3Data.wma;
            const name = mp3Data.mname;
            const filePath = path.resolve(rootPath, `${name}.mp3`);
            await downloadMp3(mp3Url, filePath);
        }
    },
};
