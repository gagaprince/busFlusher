import { Anylyzer } from './spider';
import cheerio from 'cheerio';

export interface IBusBisicInfo {
    href: string;
    smallImg: string;
}

export default class BusSearchAnylyzer implements Anylyzer {
    private static _instance: BusSearchAnylyzer;
    static getInstance() {
        if (!this._instance) {
            this._instance = new BusSearchAnylyzer();
        }
        return this._instance;
    }
    anylyse(html: string): IBusBisicInfo | undefined {
        if (!html) return;
        const $ = cheerio.load(html);

        const tag = $('#waterfall')
            .find('.item')
            .eq(0);
        if (tag) {
            const aTag = tag.find('a');
            const imgTag = tag.find('img');
            const href = aTag.attr('href') || '';
            const smallImg = imgTag.attr('src') || '';
            return { href, smallImg };
        } else {
            return;
        }
    }
}
