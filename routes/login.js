const router = require('koa-router')()
const UserInfo = require('../modules/login');

router.all('/login', async (ctx, next) => {
    console.log(ctx.request.body);
    let user = new UserInfo(ctx.request.body.userId, ctx.request.body.password);
    let result;
    let ret = {success: false};
    try {
        result = await user.login();
    } catch (err) {
        ret.info = "Search error";
        console.log(err);
        ctx.body = ret;
    }
    if (result.length > 0) {
        ctx.session.user = ctx.request.body.userId;
        //res.send(req.body.userId + " Login success!")
        //res.redirect("/");
        ret.success = true;
        ret.userId = ctx.request.body.userId;
        ctx.body = ret;
    }
});


router.get('/getuser', async (ctx, next) => {
    ctx.body = {data: ctx.session.user}
});


router.get('/logout', async (ctx, next) => {
    ctx.body = {data: ctx.session.user}
    ctx.session.user = "";
    ctx.body = "";
});

module.exports = router
