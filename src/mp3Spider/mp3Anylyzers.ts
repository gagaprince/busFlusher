import { Anylyzer } from '../spider';
import cheerio from 'cheerio';
export class Mp3IndexAnylyzer implements Anylyzer {
    anylyse(html: string) {
        // console.log(html);
        const $ = cheerio.load(html);
        const mp3ListHtml = $('.songName ');
        let mp3List = [];
        // console.log(mp3ListHtml);
        for (let i = 0; i < mp3ListHtml.length; i++) {
            const tag = mp3ListHtml.eq(i);
            const url = tag.attr('href') || '';
            const name = tag.text().trim();
            const id = url?.replace('/play/', '').replace('.htm', '');
            const tpath = Math.floor(+id / 1000) + 1;
            const sourceUrl = `/html/playjs/${tpath}/${id}.js`;
            mp3List.push({ url, name, id, sourceUrl });
        }
        console.log(mp3List);
        return mp3List;
    }
}

export class Mp3DetailAnylyzer implements Anylyzer {
    anylyse(html: string) {
        const jsonStr = html.substring(1, html.length - 1);
        const json = JSON.parse(jsonStr);
        console.log(json);
        return json;
    }
}
