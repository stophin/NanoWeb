const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {title: 'Welcome: ' + ctx.session.user});
});

router.get('/manage', async (ctx, next) => {
    await ctx.render('manage', {title: 'Manage: ' + ctx.session.user});
});


module.exports = router