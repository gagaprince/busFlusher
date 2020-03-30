import Spider from './spider';
import NasInfoAnylyzer, { IMoiveMainInfo } from './nasInfoAnylyzer';
import BusSearchAnylyzer, { IBusBisicInfo } from './busSearchAnylyzer';
import BusDetailAnylyzer, { IBusDetailInfo } from './busDetailAnylyzer';

interface IInitData {
    url: string;
    cookie: string;
    referer: string;
    token: string;
    ua: string;
}

export default class NasFlush {
    constructor(private initData: IInitData) {
        console.log(initData);
    }

    async beginExec() {
        const mainInfos:
            | IMoiveMainInfo[]
            | undefined = await this.getMovieInfo();
        if (mainInfos) {
            mainInfos.forEach(async (mainInfo: IMoiveMainInfo) => {
                const totalInfo = await this.getBusInfo(mainInfo);
                totalInfo && this.saveMovieInfo(totalInfo);
            });
        }
    }

    async saveMovieInfo(
        totalInfo: IMoiveMainInfo & IBusBisicInfo & IBusDetailInfo
    ) {
        console.log(totalInfo);
        let flagData = await this.saveDetailInfo(totalInfo);
        console.log(flagData);
        if (!JSON.parse(flagData)['success']) {
            console.log(totalInfo.chepai + '有重复的了吧');
        }
        flagData = await this.saveSmallImg(totalInfo);
        console.log(flagData);
        flagData = await this.saveBigImg(totalInfo);
        console.log(flagData);
    }

    async saveDetailInfo(
        totalInfo: IMoiveMainInfo & IBusBisicInfo & IBusDetailInfo
    ) {
        const { url, cookie, referer, token, ua } = this.initData;
        const { id, title, cate, av } = totalInfo;
        const nasSpider = new Spider(null);
        const data = {
            library_id: 1,
            target: '"video"',
            id,
            title: `"${title.substring(0, 42)}"`,
            genre: `["${cate.substring(0, 42)}"]`,
            actor: `["${av.substring(0, 42)}"]`,
            metadata_locked: true,
            director: '[""]',
            writer: '[""]',
            certificate: '""',
            rating: -1,
            summary: '""',
            tagline: '""',
            original_available: '""',
            extra: '"null"',
            api: 'SYNO.VideoStation2.Movie',
            method: 'edit',
            version: 1,
        };
        return await nasSpider.post(url, data, {
            Cookie: cookie,
            Referer: referer,
            'X-SYNO-TOKEN': token,
            'User-Agent': ua,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
    }
    async saveSmallImg(
        totalInfo: IMoiveMainInfo & IBusBisicInfo & IBusDetailInfo
    ) {
        const { url, cookie, referer, token, ua } = this.initData;
        const { id, smallImg } = totalInfo;
        const nasSpider = new Spider(null);
        const data = {
            target: '"url"',
            id,
            type: '"movie"',
            url: smallImg,
            api: 'SYNO.VideoStation2.Poster',
            method: 'set',
            version: 1,
        };
        return await nasSpider.post(url, data, {
            Cookie: cookie,
            Referer: referer,
            'X-SYNO-TOKEN': token,
            'User-Agent': ua,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
    }
    async saveBigImg(
        totalInfo: IMoiveMainInfo & IBusBisicInfo & IBusDetailInfo
    ) {
        const { url, cookie, referer, token, ua } = this.initData;
        const { id, bigImg } = totalInfo;
        const nasSpider = new Spider(null);
        const data = {
            image: '"url"',
            id,
            type: '"movie"',
            url: bigImg,
            api: 'SYNO.VideoStation2.Backdrop',
            method: 'add',
            version: 1,
        };
        return await nasSpider.post(url, data, {
            Cookie: cookie,
            Referer: referer,
            'X-SYNO-TOKEN': token,
            'User-Agent': ua,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
    }

    async getBusInfo(mainInfo: IMoiveMainInfo) {
        const { id, chepai } = mainInfo;
        console.log(id);
        console.log(chepai);
        if (chepai) {
            const basicinfo:
                | IBusBisicInfo
                | undefined = await this.getBusInfoByChePai(chepai);
            if (basicinfo) {
                const detailInfo = await this.getDetailInfo(basicinfo);
                if (detailInfo) {
                    const totalInfo = Object.assign(
                        {},
                        mainInfo,
                        basicinfo,
                        detailInfo
                    );
                    return totalInfo;
                }
            }
        }
    }

    async getDetailInfo({ href }: IBusBisicInfo) {
        const busDetailAnylyzer = BusDetailAnylyzer.getInstance();
        const busSearchSpider = new Spider(busDetailAnylyzer);

        const detailInfo:
            | IBusDetailInfo
            | undefined = await busSearchSpider.get(href);
        return detailInfo;
    }

    async getBusInfoByChePai(chepai: string) {
        const busSearchAnylyzer = BusSearchAnylyzer.getInstance();
        const busSearchSpider = new Spider(busSearchAnylyzer);

        const url = `https://www.javbus.cloud/search/${chepai}&type=&parent=ce`;
        return await busSearchSpider.get(url);
    }

    async getMovieInfo() {
        const nasInfoAnylyzer = NasInfoAnylyzer.getInstance();
        const nasSpider = new Spider(nasInfoAnylyzer);

        const { url, cookie, referer, token, ua } = this.initData;
        return await nasSpider.post(
            url,
            {
                offset: 0,
                limit: 10,
                sort_by: 'added',
                sort_direction: 'desc',
                library_id: 1,
                additional: JSON.stringify([
                    'poster_mtime',
                    'summary',
                    'watched_ratio',
                    'collection',
                ]),
                api: 'SYNO.VideoStation2.Movie',
                method: 'list',
                version: 1,
            },
            {
                Cookie: cookie,
                Referer: referer,
                'X-SYNO-TOKEN': token,
                'User-Agent': ua,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        );
    }
}
