const router = require('koa-router')()
const Record = require('../modules/records.js');
var bodyParse =require('koa-body'); 

router.prefix('/records')

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

    totalCount=await Record.getQuantity(query);
    let result
   try{
    result=await Record.get(query + sort + limit);
   }catch (err){
       result=[];
   }
    ctx.body={success: true, data: result, totalCount: totalCount[0].total};
})

// 新建
router.post('/', async function (ctx, next) {
    let record = new Record(ctx.request.body.un32GameId, 
                            ctx.request.body.un32UserId,
                            ctx.request.body.dGold);
    let result;
    try{
        result=await record.save();
    }catch(err){
        console.log('发布失败!');
        ctx.body = {success: false};
        return;
    }
    console.log('发布成功!');
    //insertId用于更新页面表单中的id
    record.id = result.insertId;
    ctx.body={success: true, data: record};
});

// 编辑
router.put('/:id',async function (ctx, next) {
    let record = new Record(ctx.request.body.un32GameId, 
                            ctx.request.body.un32UserId,
                            ctx.request.body.dGold,
                            ctx.request.body.id);
    try {
        await record.update();
    }catch (err){
        console.log('修改失败!');
        ctx.body={success: false};
        return;
    }
    console.log('修改成功!');
    ctx.body={success: true, data: record};
});

// 删除
router.delete('/:id', async function (ctx, next) {
    var query = 'id = ' + ctx.request.body.id;
    try {
        let res = await Record.remove(query);
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

//历史记录
router.get('/hist', async function (ctx, next) {
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
    //历史记录默认按照时间排序
    let sort = "";
    if (ctx.query.sort) {
        let order = JSON.parse(ctx.query.sort);
        console.log(JSON.stringify(order[0]));
        sort = " order by " + order[0].property + " " + order[0].direction + " ";
        sort += ", tTime desc ";
    } else {
        sort = " order by tTime desc ";
    }
    let  limit =  "";
    if (ctx.query.start && ctx.query.limit) {
      limit += " limit " + ctx.query.start + "," + ctx.query.limit
    }
    
    console.log(query);
    console.log(sort);
    console.log(limit);

    totalCount=await Record.getHistQuantity(query);
    let result
   try{
    result=await Record.hist(query + sort + limit);
   }catch (err){
       result=[];
   }
    ctx.body={success: true, data: result, totalCount: totalCount[0].total};
})

module.exports = router
