import NasFlush from './nasFlush';

const nasFlush = new NasFlush({
    url: 'http://gaga.pc.com/webapi/entry.cgi',
    cookie: 'stay_login=1; id=tdmzf2QWh3HysYq30ZR-AU8oCACU4qbeQaZk6dDEizAWljqM6qyU0deRh0IT-wu1PMji-8KiDTR2-KFBBsZeQg; smid=eCXVkCrnB4PyEHnhoB5dFf67c3P0MS9lnVyv9ncf2y_7mKvs3vgdue6P5CXDCHsb4tfex99a-S_a9mh4d6yiLg',
    token: '3OPvmKBIt5S4Q',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    referer:
        'http://gaga.pc.com/?launchApp=SYNO.SDS.VideoStation.AppInstance&SynoToken=3OPvmKBIt5S4Q',
});

nasFlush.beginExec();
