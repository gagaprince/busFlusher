import { Anylyzer } from './spider';

interface IFileInfo {
    id: number;
    path: string;
}

interface IAdditional {
    file: IFileInfo[];
}

interface IMovie {
    title: string;
    id: number;
    additional: IAdditional;
}

interface IMovieData {
    movie: IMovie[];
    offset: number;
    total: number;
}

interface IMovieInfoResponse {
    data: IMovieData;
    success: boolean;
}

export interface IMoiveMainInfo {
    id: number;
    path: string;
    chepai: string;
}

export default class NasInfoAnylyzer implements Anylyzer {
    private static _instance: NasInfoAnylyzer;
    static getInstance() {
        if (!this._instance) {
            this._instance = new NasInfoAnylyzer();
        }
        return this._instance;
    }
    anylyse(data: string): IMoiveMainInfo[] | undefined {
        if (!data) return;
        const movieInfoResponse: IMovieInfoResponse = JSON.parse(data);
        return this.getMainInfoFromMovieInfo(movieInfoResponse.data);
    }
    getMainInfoFromMovieInfo(movieInfoData: IMovieData): IMoiveMainInfo[] {
        const mainInfos: IMoiveMainInfo[] = [];

        const movies: IMovie[] = movieInfoData.movie;
        movies.forEach((movie: IMovie) => {
            const additional = movie.additional;
            if (additional.file) {
                const file: IFileInfo = additional.file[0];

                const id = movie.id;
                const path = file.path;

                const chepai = this.getChePaiFromPath(path) || '';

                const mainInfo: IMoiveMainInfo = {
                    id,
                    path,
                    chepai,
                };
                mainInfos.push(mainInfo);
            }
        });

        return mainInfos;
    }
    getChePaiFromPath(path: string) {
        let patt = /.+?([a-zA-Z]+-\d+).+/gi;
        let match = patt.exec(path);
        if (!match) {
            const paths = path.split('/');
            patt = /^([a-zA-Z]+\d+).+/gi;
            match = patt.exec(paths[paths.length - 1]);
        }
        return match && match[1];
    }
}
