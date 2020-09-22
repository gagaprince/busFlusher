import superagent from 'superagent';
const fs = require('fs');
export const download = async (url: string, filePath: string) => {
    return new Promise((res) => {
        superagent.get(url).end((err, sres) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.writeFile(filePath, sres.body, 'binary', (err: any) => {
                if (err) throw err;
                res();
            });
        });
    });
};
