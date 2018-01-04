const router = require('koa-router')()
const User = require('../modules/users.js');
var xlsx = require('node-xlsx'); 
var fs = require('fs');
var mime = require("mime");
var bodyParse =require('koa-body'); 

router.prefix('/users')

router.get('/', async function (ctx, next) {
    console.log(ctx.query);
    let totalCount = 0;
    let query = "";
    if (ctx.query.condition) {
        let condition = JSON.parse(ctx.query.condition);
        console.log(condition)
        for (let key in condition) {
            if (condition[key]) {
                query += " and " + key + " like '%" + condition[key] + "%' ";
            }
        }
    }
    if (query) {
        query = " WHERE 1 = 1 " + query;
    }
    let sort = "";
    if (ctx.query.sort) {
        let order = JSON.parse(ctx.query.sort);
        console.log(JSON.stringify(order[0]));
        sort = " order by " + order[0].property + " " + order[0].direction + " ";
    }
    let  limit =  "";
    if (ctx.query.start && ctx.query.limit) {
      limit += " limit " + ctx.query.start + "," + ctx.query.limit
    }
    
    console.log(query);
    console.log(sort);
    console.log(limit);

    totalCount=await User.getQuantity(query);
    let result
   try{
    result=await User.get(query + sort + limit);
   }catch (err){
       result=[];
   }
    ctx.body={success: true, data: result, totalCount: totalCount[0].total};
})

// 新建
router.post('/', async function (ctx, next) {
    let user = new User(ctx.request.body.name, ctx.request.body.password);
    let result;
    try{
        result=await user.save();
    }catch(err){
        console.log('发布失败!');
        ctx.body = {success: false};
        return;
    }
    console.log('发布成功!');
    //insertId用于更新页面表单中的id
    user.id = result.insertId;
    ctx.body={success: true, data: user};
});

// 编辑
router.put('/:id',async function (ctx, next) {
    let user = new User(ctx.request.body.name, ctx.request.body.password,ctx.request.body.id);
    try {
        await user.update();
    }catch (err){
        console.log('修改失败!');
        ctx.body={success: false};
        return;
    }
    console.log('修改成功!');
    ctx.body={success: true, data: user};
});

// 删除
router.delete('/:id', async function (ctx, next) {
    var query = 'id = ' + ctx.request.body.id;
    try {
        let res = await User.remove(query);
        if (res == 1) {
          ctx.body = {success:false};
        } else {
          ctx.body = {success:true};
        }
        return;
    }catch (err){
        console.log('删除失败!');
        ctx.body={success:false};
        return;
    }
});

router.post('/exportUser', async function(ctx, next) {
    try {

      var data = ctx.request.body.data;
      var filename = ctx.request.body.filename;
      console.log(filename);
      console.log(data);
      data = JSON.parse(data);
      var buffer = xlsx.build([{name: "mySheetName", data: data}]);
      var realpath = "./public/files/download/" + filename;
      fs.writeFileSync(realpath, buffer, 'binary');
      console.log(realpath);

      var mimetype = mime.lookup(filename);
      console.log(mimetype);
      ctx.res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      ctx.res.setHeader('Content-type', mimetype);
      ctx.body = fs.createReadStream(realpath);
  } catch(e) {
    ctx.body = "Read error: " + e;
  }
});

router.post("/importUser",bodyParse({multipart:true}), async function(ctx, next) {
    try {
        var file = ctx.request.body.files.filename;
        var reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream("./public/files/upload/" + file.name);
        await reader.pipe(stream);
        console.log('uploading: ' + file.name + "->" + stream.path);
        
        stream.on('close',function(){  
            console.log('copy over');  
        });
        ctx.body = {success: true, data: stream.path};
    } catch(e) {
      ctx.body = "Upload error: " + e;
    }
})


//批量新建
router.post('/batchUsers', async function (ctx, next) {
  {
        var path = ctx.request.body.filename;
        console.log(path);
        //解析文件
        var data = xlsx.parse(path);  
        //导入数据库
        var obj = data;
        var values = [];
        for (key in obj) {
          var data = obj[key].data;
          var ind = 0;
          for (_key in data) {
            if (ind == 0) {
              //标题行省略
            } else {
              var row = data[_key];
              var value = [];
              var cnt = 0;
              for (__key in row) {
                if (cnt == 0) {
                  //自动获取ID
                  value.push(await User.getID(ind));
                } else {
                  value.push(row[__key]);
                }
                cnt ++;
              }
              values.push(value);
            }
            ind ++;
          }
        }
        //做成values字符串传入后台
        //query (1, 2, 3, ...), (1, 2, 3, ...), ...
        var query = JSON.stringify(values);
        console.log(query);
        query = query.replace(/\[\[/g, "(");
        query = query.replace(/\]\]/g, ")");
        query = query.replace(/\[/g, "(");
        query = query.replace(/\]/g, ")");
        console.log(query);

        await User.batch(query)

        ctx.body = {success: true, data: query};
    } 
});

module.exports = router
