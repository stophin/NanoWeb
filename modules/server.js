/**
 * Created by stophin
 */
const dbHelper=require('./dbHelper');

function Server(){
}

Server.prototype.save =async function save(param) {
    await dbHelper.start();
    let params = [
		 param.sign,
		 param.n32IsSuccess,
		 param.n32ProtocolId,
		 param.gameId,
		 param.gameType,
		 param.timestamp,
		 param.exit,
		 param.userId,
		 param.roundId,
		 param.zlib,
		 param.szJson,
		 param.szRecords,
		 param.szRecords_c,
	];
	let sqlStr = "replace na_ha_message_web set ";			
	sqlStr += " szSign=?";
	sqlStr += ", n32IsSuccess=?";
	sqlStr += ", n32ProtocolId=?";
	sqlStr += ", n32GameID=?";
	sqlStr += ", n32GameType=?";
	sqlStr += ", tTimeStamp=?";
	sqlStr += ", n32Exit=?";
	sqlStr += ", n32UserID=?";
	sqlStr += ", n32RoundID=?";
	sqlStr += ", n32Zlib=?";
	sqlStr += ", szJson=?";
	sqlStr += ", szRecords=?";
	sqlStr += ", szRecords_c=?";
	sqlStr += ";";
    let result=await dbHelper.execute(sqlStr, params);
    await dbHelper.stop();
    return result;
};


//登陆
Server.prototype.login = async function(param) {
	let sqlStr = "select * from na_gameuser where ";
	sqlStr += " szUserName = ?"
	sqlStr += " and password = ?";
	sqlStr += " and merchantId = ?;";
	let params = [
		param.userName,
		param.password,
		param.merchantId
	];
	let result = await dbHelper.executemain(sqlStr, params);
	console.log(JSON.stringify(result));
	await dbHelper.stop();
	return result;
}

//修改信息
Server.prototype.modifyInfo = async function(param) {
	let sqlStr = "select * from na_gameuser where ";
	sqlStr += " un32UserId = ?;"
	let params = [
		param.userId
	];
	let result = await dbHelper.executemain(sqlStr, params);
	console.log(JSON.stringify(result));
	await dbHelper.stop();
	return result;
}
//商户信息
Server.prototype.merchantInfo = async function(param) {
	let sqlStr = "select * from na_merchant where ";
	sqlStr += " mid = ?;"
	let params = [
		param.parentId
	];
	let result = await dbHelper.executemain(sqlStr, params);
	console.log(JSON.stringify(result));
	await dbHelper.stop();
	return result;
}
//进入游戏
Server.prototype.playerJoin = async function(param) {
	let sqlStr = "select * from na_gameuser where ";
	sqlStr += " un32UserId = ?;"
	let params = [
		param.userId
	];
	let result = await dbHelper.executemain(sqlStr, params);
	console.log(JSON.stringify(result));
	await dbHelper.stop();
	return result;
}


module.exports = Server;