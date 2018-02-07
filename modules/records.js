const dbHelper = require('./dbHelper');

function Record(gameId, userId, gold, id) {
  this.un32GameId = gameId,
  this.un32UserId = userId,
  this.dGold = gold,
  this.id = id
}

//新建
Record.prototype.save = async function save(callback) {
    var record = {
      "un32GameId": this.un32GameId,
      "un32UserId": this.un32UserId,
      "dGold": this.dGold
    };
    await dbHelper.start();
    let result = await dbHelper.execute('INSERT INTO `na_user_change_web` SET ?', record);
    await dbHelper.stop();
    return result;
};

Record.get = async function get(query, callback){
    var sql = 'SELECT * FROM `na_user_change_web`' + (query ? query : '')
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    console.log(JSON.stringify(result));
    for (key in result) {
      let sqlStr = "select * from na_gameuser where un32UserId = ?;";
      let params = [
        result[key].un32UserId
      ];
      let userInfo = await dbHelper.executemain(sqlStr, params);
      if (userInfo.length > 0) {
        result[key].szUserName = userInfo[0].szUserName;
        result[key].szNickName = userInfo[0].szNickName;
        result[key].dCurGold = userInfo[0].dGold;
        result[key].merchantId = userInfo[0].merchantId;
      } else {
        result[key].szUserName = "";
        result[key].szNickName = "";
        result[key].dCurGold = "";
        result[key].merchantId = "";
      }
    }
    await dbHelper.stop();
    return result;
};

Record.getQuantity = async function get(query, callback){
    var sql = 'SELECT COUNT(0) AS total FROM `na_user_change_web`' + (query ? query : '')
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};


Record.hist = async function hist(query, callback){
    var sql = 'SELECT * FROM `na_user_change_hist_web`' + (query ? query : '');
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    console.log(JSON.stringify(result));
    for (key in result) {
      let sqlStr = "select * from na_gameuser where un32UserId = ?;";
      let params = [
        result[key].un32UserId
      ];
      let userInfo = await dbHelper.executemain(sqlStr, params);
      if (userInfo.length > 0) {
        result[key].szUserName = userInfo[0].szUserName;
        result[key].szNickName = userInfo[0].szNickName;
        result[key].dCurGold = userInfo[0].dGold;
      } else {
        result[key].szUserName = "";
        result[key].szNickName = "";
        result[key].dCurGold = "";
      }
    }
    await dbHelper.stop();
    return result;
};
Record.getHistQuantity = async function get(query, callback){
    var sql = 'SELECT COUNT(0) AS total FROM `na_user_change_hist_web`' + (query ? query : '')
    await dbHelper.start();
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};

//改
Record.prototype.update = async  function (callback) {
  var sql = 'update `na_user_change_web` set';
  var params = [];
  if (this.un32GameId) {
    sql +=  ' un32GameId = ?';
    params.push(this.un32GameId);
  } else {
    sql +=  ' un32GameId = un32GameId';
  }
  sql += ',';
  if (this.un32UserId) {
    sql +=  ' un32UserId = ?';
    params.push(this.un32UserId);
  } else {
    sql +=  ' un32UserId = un32UserId';
  }
  sql += ',';
  if (this.dGold) {
    sql +=  ' dGold = ?';
    params.push(this.dGold);
  } else {
    sql +=  ' dGold = dGold';
  }
  sql += ' where id = ?;';
  params.push(this.id);

    await dbHelper.start();
    let result = await dbHelper.execute(sql, params);
    await dbHelper.stop();
    return result;
}

//删
Record.remove = async  function(query, callback) {
    var sql = 'DELETE FROM  `na_user_change_web` WHERE ' + query;
    let result = await dbHelper.execute(sql, []);
    await dbHelper.stop();
    return result;
};

module.exports = Record;
