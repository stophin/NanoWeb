
const pool=require('mysql2').createPool({
    host : '127.0.0.1',
        user : 'root',
        password : 'root',
        port : '3306',
        database : 'gameserver',
    supportBigNumbers:true
});
const poolmain=require('mysql2').createPool({
    host : '127.0.0.1',
        user : 'root',
        password : 'root',
        port : '3306',
        database : 'gameplaza',
    supportBigNumbers:true
});

let dbHelper={};

dbHelper.start=async ()=>{
    // await pool.getConnection();
    // console.log(dbHelper.connection);
};

dbHelper.execute=async (query,params, log)=>{
    return new Promise(function (resolve,reject) {
        if (!log) {
            console.log(query);
            console.log(params);
        }
        pool.query(query,params,function (err,rows,fields) {
            if (err) reject(err);
            // console.log('execute result:')
            // console.log(rows)
            resolve(rows);
        })
            .on('error',function () {
            reject('query error');
        });
    });
};

dbHelper.executemain = async(query, params, log)=> {
    return new Promise(function (resolve,reject) {
        if (!log) {
            console.log(query);
            console.log(params);
        }
        poolmain.query(query,params,function (err,rows,fields) {
            if (err) reject(err);
            // console.log('execute result:')
            // console.log(rows)
            resolve(rows);
        })
            .on('error',function () {
            reject('query error');
        });
    });
}

dbHelper.stop=async ()=>{
}

module.exports=dbHelper;