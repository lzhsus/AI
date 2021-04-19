// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router');
const rq = require('request');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
/**
 * 管理员
 */
const user = require('./user/index');
const wx_server = require('./wx_server/index');

exports.main = async (event, context) => {
    const app = new TcbRouter({
        event
    });
    // 验证用户是否注册
    // app.use 表示该中间件会适用于所有的路由
    app.use(async (ctx, next) => {
        ctx.data = {};
        if(true){
            await next(); // 执行下一中间件
        }else{
            ctx.body = res; 
        }
    });

    app.router('user/api/invoke/msg', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.invoke(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/invoke/boast', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.boast(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/invoke/emotional', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.emotional(event, context)
            resolve(res);
        }); 
    });
    
    app.router('user/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.create(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/info', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.info(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/sign', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.sign(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/ranking', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.ranking(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/rankinglist', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.rankinglist(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/verse/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.verse(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/manager_log', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.manager_log(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/translate_log', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.translate_log(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/active', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.active(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/chongwuupdata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.chongwuupdata(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/_send', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user._send(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/pet/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.petList(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/pet/detail', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.petDetail(event, context)
            resolve(res);
        }); 
    });
    

    
    
    // 微信服务
    app.router('wx_server/api/ocr', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.OCR(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.create(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/updata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.updata(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/run', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.run(event, context)
            resolve(res);
        }); 
    });
    
    
    
    
    return app.serve();
}