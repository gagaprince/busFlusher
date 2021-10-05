import { CorpWxService } from '@thrift-api/ds-be-http';

const corpWxService = new CorpWxService({
    appkey: 'com.sankuai.ds.be.http',
});

corpWxService
    .createChatByAssistant({
        request: {
            chatName: '美团外卖多重福利群1',
            members: ['姜浩'],
            notice: '1',
            corpId: 'wwd99d25a5144b47bd',
            orgId: '0',
            misId: 'wanglongshuai02',
            admins: ['姜浩'],
            deviceMobile: '18515980305',
        },
    })
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
