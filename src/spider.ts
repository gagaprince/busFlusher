import superagent from 'superagent';
export interface Anylyzer {
    anylyse: (html: string) => any;
}

interface IPostData {
    [propName: string]: any;
}

interface IHeaders {
    [propName: string]: string;
}

export default class Spider {
    constructor(private anylyzer: Anylyzer | null) {}

    async get(url: string, headers?: IHeaders) {
        let request = superagent.get(url);
        if (headers) {
            request = request.set(headers);
        }
        const result = await request.catch(e => {
            console.log(e.status);
            return null;
        });
        return (
            (this.anylyzer &&
                this.anylyzer.anylyse((result && result.text) || '')) ||
            (result && result.text)
        );
    }

    async post(url: string, data: IPostData, headers: IHeaders) {
        const result = await superagent
            .post(url)
            .set(headers)
            .send(data)
            .catch(e => {
                console.log(e.status);
                return null;
            });
        return (
            (this.anylyzer &&
                this.anylyzer.anylyse((result && result.text) || '')) ||
            (result && result.text)
        );
    }
}
