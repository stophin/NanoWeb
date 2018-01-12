const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session=require('koa-session-minimal');
const sessionMysql=require('koa-mysql-session');

const login=require('./routes/login');
const index=require('./routes/index');
const users=require('./routes/users');
const records=require('./routes/records');
const server=require('./routes/server');
global.dbHelper=require('./modules/dbHelper');
global.root_dir=__dirname+'/';


let cookie={
    overwrite:true
};

app.use(session({
    key:'SESSION_ID',
    cookie:cookie
}));

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/views/app'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

//登录拦截器 and logger
let serviceReg = new RegExp(/\/service\//);
//本地回环或localhost地址转换
let loopbackReg = new RegExp(/\/127.0.0.1/);
let localhostReg = new RegExp(/\/localhost/);
let serverIPReg = new RegExp(/\/192.168.2.100/);
//
let htmlReg = new RegExp(/.html/);
app.use(async (ctx, next) =>  {
    const start = new Date();
    let url = ctx.originalUrl;
    //console.log(JSON.stringify(ctx));
    console.log(url);
    console.log("Reg: " + serviceReg.test(url));
    console.log("user: " + ctx.session.user);
    if (loopbackReg.test(url)) {
      console.log("localhost");
      ctx.originalUrl = ctx.originalUrl.replace(loopbackReg, "");
      ctx.url = ctx.url.replace(loopbackReg, "");
      console.log(ctx.originalUrl);
    }
    else if (localhostReg.test(url)) {
      console.log("localhost");
      ctx.originalUrl = ctx.originalUrl.replace(localhostReg, "");
      ctx.url = ctx.url.replace(localhostReg, "");
      console.log(ctx.originalUrl);
    }
    else if (serverIPReg.test(url)) {
      console.log("localhost");
      ctx.originalUrl = ctx.originalUrl.replace(serverIPReg, "");
      ctx.url = ctx.url.replace(serverIPReg, "");
      console.log(ctx.originalUrl);
    }
    if (htmlReg.test(url)) {
      console.log("html");
      let filename = ctx.originalUrl;
      ctx.originalUrl = "/NAGame/fileReader?filename=" + filename;
      ctx.url = ctx.originalUrl;
      console.log(ctx.originalUrl);
    }
    if (url != "/login" && url != "app/login/index" && !ctx.session.user &&
        !serviceReg.test(url) ) {
      console.log("in");
      // dummy login user to allow for resources of login.ejs
      //ctx.session.user = "login";
      //for extjs 4 use this redirection
      //await ctx.render('login', { title: 'Login'});
      //for extjs 6 use this redirection
      await ctx.render('app/login/index', { title: 'Login'});
    } else {
      await next();
    }
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(login.routes(),login.allowedMethods());
app.use(index.routes(),index.allowedMethods());
app.use(users.routes(),users.allowedMethods());
app.use(records.routes(),records.allowedMethods());
app.use(server.routes(),server.allowedMethods());
module.exports = app;

