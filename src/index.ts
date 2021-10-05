import NasFlush from './nasFlush';

const nasFlush = new NasFlush({
    url: 'http://gaga.pc.com/webapi/entry.cgi',
    cookie: 'stay_login=1; id=ymgwvp0fyNjq-JgGfawtqjUj1JkC1syG3gIepLtCs-gumzuMQUV-Q9yxQE-_IlwOpNlZSTnzAdM2MYWziTdUjg; smid=YPr7NlVUNXphPE7SAExA1oAdzRUno77RYfdlexvCxgj9_7QyaAFFGCBpdZMM53VkCN5HwHQ1z52AqwPLNEnUoQ',
    token: 'Qe4WVbmqjUFwc',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    referer:
        'http://gaga.pc.com/?launchApp=SYNO.SDS.VideoStation.AppInstance&SynoToken=Qe4WVbmqjUFwc',
});

nasFlush.beginExec();
