// import NasFlush from './nasFlush';

// const nasFlush = new NasFlush({
//     url: 'http://gaga.pc.com/webapi/entry.cgi',
//     cookie:
//         'stay_login=1; smid=573pEzfPghJ1f1kAFt-qOCrSDTsJzB-ve9fQCO6AmJlLVJcoh3Aaxf1xFgYS-krvZLIY5pwte0affFb1NL-C_w; id=EbUeqBHI169Tk1940PCN193202',
//     token: 'JbLHVTDvJEFXQ',
//     ua:
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
//     referer:
//         'http://gaga.pc.com/?launchApp=SYNO.SDS.VideoStation.AppInstance&SynoToken=JbLHVTDvJEFXQ',
// });

// nasFlush.beginExec();

import photoSpider from './photoSpider/index';
photoSpider.beginSpider();
