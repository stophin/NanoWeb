
const pool=require('mysql2').createPool({
    host : '127.0.0.1',
        user : 'root',
        password : 'root',
        port : '3306',
        database : 'na_40_forestsprite',
    supportBigNumbers:true
});
const poolmain=require('mysql2').createPool({
    host : '127.0.0.1',
        user : 'root',
        password : 'root',
        port : '3306',
        database : 'na_gameplaza',
    supportBigNumbers:true
});

let dbHelper={};

dbHelper.start=async ()=>{
    // await pool.getConnection();
    // console.log(dbHelper.connection);
};

dbHelper.execute=async (query,params)=>{
    return new Promise(function (resolve,reject) {
        //console.log(query);
        //console.log(params);
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

dbHelper.executemain = async(query, params)=> {
    return new Promise(function (resolve,reject) {
        console.log(query);
        console.log(params);
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