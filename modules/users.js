const dbHelper = require('./dbHelper');

function User(name, password, id) {
  this.name    = name;
  this.password   = password;
  this.id = id;
}

//批量新建
//query (1, 2, 3, ...), (1, 2, 3, ...), ...
User.batch = async function (query, callback) {
    console.log(query);
    await dbHelper.start();
    let result = await dbHelper.execute('INSERT INTO `users` (id, name, password) values  ' + query, []);
    await dbHelper.stop();
    return result;
};

//新建
User.prototype.save = async function save(callback) {
    var user = {
      name: this.name,
      password: this.password
    };
    await dbHelper.start();
    let result = await dbHelper.execute('INSERT INTO `users` SET ?', user);
    await dbHelper.stop();
    return result;
};

User.get = async function get(query, callback){
    var sql = 'SELECT * FROM `users`' + (query ? query : '')
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};

User.getQuantity = async function get(query, callback){
    var sql = 'SELECT COUNT(0) AS total FROM `users`' + (query ? query : '')
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};

//改
User.prototype.update = async  function (callback) {
  var sql = 'update `users` set';
  var params = [];
  if (this.name) {
    sql +=  ' name = ?';
    params.push(this.name);
  } else {
    sql +=  ' name = name';
  }
  sql += ',';
  if (this.password) {
    sql +=  ' password = ?';
    params.push(this.password);
  } else {
    sql +=  ' password = password';
  }
  sql += ' where id = ?';
  params.push(this.id);

    await dbHelper.start();
    let result = await dbHelper.execute(sql, params);
    await dbHelper.stop();
    return result;
}

//删
User.remove = async  function(query, callback) {
  //至少保留一个用户
  var sql_before = 'select count(0) as count from `users`';
    await dbHelper.start();
    let count = await dbHelper.execute(sql_before, []);
    if (count && count[0].count <= 1) {
      await dbHelper.stop();
      return count[0].count;
    }
    var sql = 'DELETE FROM  `users` WHERE ' + query;
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};

User.getID = async (number) => {
    await dbHelper.start();
    let result = await dbHelper.execute("select max(id) as max from users", []);
    await dbHelper.stop();
    console.log(result[0].max);
    if (number) {
        result[0].max += number;
    }
    return (+result[0].max + 1);
}

module.exports = User;
