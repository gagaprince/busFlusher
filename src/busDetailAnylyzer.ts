import { Anylyzer } from './spider';
import cheerio from 'cheerio';

export interface IBusDetailInfo {
    bigImg: string;
    cate: string;
    av: string;
    title: string;
}

export default class BusDetailAnylyzer implements Anylyzer {
    private static _instance: BusDetailAnylyzer;
    static getInstance() {
        if (!this._instance) {
            this._instance = new BusDetailAnylyzer();
        }
        return this._instance;
    }
    anylyse(html: string): IBusDetailInfo | undefined {
        if (!html) return;
        const $ = cheerio.load(html);

        const mainTag = $('.container').eq(0);
        const h3Tag = mainTag.find('h3');
        const title = h3Tag.text() || '';

        const movieTag = mainTag.find('.movie').eq(0);
        const aTag = movieTag.find('.bigImage').eq(0);
        const bigImg = aTag.attr('href') || '';

        const genreTag = movieTag.find('.genre').find('a');
        const cate = genreTag.text() || '';

        const avTag = movieTag.find('#star_viu');
        const av = avTag.find('a').text() || '';

        return { title, bigImg, cate, av };
    }
}
