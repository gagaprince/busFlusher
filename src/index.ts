import NasFlush from './nasFlush';

const nasFlush = new NasFlush({
    url: 'http://192.168.50.51:5000/webapi/entry.cgi',
    cookie:
        'stay_login=1; id=KqzCBhFLVjkFQ1940PCN193202; smid=3Y74hhpZf0VGXJ2qdfw3DEfxWwdy01QLQpXV5XQk7at-c3Mte5ca_rQGYxjW1pd1sljfwRci-q2GWSkdk4VkAA',
    token: 'JqiRkcQBzUzic',
    ua:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    referer:
        'http://192.168.50.51:5000/?launchApp=SYNO.SDS.VideoStation.AppInstance&SynoToken=JqiRkcQBzUzic',
});

nasFlush.beginExec();
