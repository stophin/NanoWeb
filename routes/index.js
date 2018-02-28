const router = require('koa-router')()

router.get('/loginindex', async (ctx, next) => {
    //for extjs 4 use this redirection
    //await ctx.render('login', { title: 'Login'});
    //for extjs 6 use this redirection
    await ctx.render('app/login/index', { title: 'Login'});
});

router.get('/', async (ctx, next) => {
	//for extjs 4 use this redireciton
   	//await ctx.render('index', {title: 'Welcome: ' + ctx.session.user});
   	//for extjs 6 use this redirection
   	await ctx.render('app/app/index', {title: 'Welcome: ' + ctx.session.user});
   	//for sencha touch 2.4 use this redirection
   	//await ctx.render('app/touchapp/index', {title: 'Welcome: ' + ctx.session.user});
});

router.get('/manage', async (ctx, next) => {
    await ctx.render('manage', {title: 'Manage: ' + ctx.session.user});
});


router.get('/linbdesktop', async (ctx, next) => {
    await ctx.render('app/linbdesktop/index',  {title: 'Welcome: ' + ctx.session.user});
})

module.exports = router
