/**
 * Created by stophin
 */
const dbHelper=require('./dbHelper');

function Server(data){
	this.szSign = data.sign;
	this.n32IsSuccess = data.n32IsSuccess;
	this.n32ProtocolId = data.n32ProtocolId;
	this.n32GameID = data.gameId;
	this.n32GameType = data.gameType;
	this.tTimeStamp = data.timestamp;
	this.n32Exit = data.exit;
	this.n32UserID = data.userId;
	this.n32RoundID = data.roundId;
	this.n32Zlib = data.zlib;
	this.szJson = data.szJson;
	this.szRecords = data.szRecords;
	this.szRecords_c = data.szRecords_c;
}

//登陆
Server.prototype.save =async function save() {
    await dbHelper.start();
    let params = [
		this.szSign,
		this.n32IsSuccess,
		this.n32ProtocolId,
		this.n32GameID,
		this.n32GameType,
		this.tTimeStamp,
		this.n32Exit,
		this.n32UserID,
		this.n32RoundID,
		this.n32Zlib,
		this.szJson,
		this.szRecords,
		this.szRecords_c
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


module.exports = Server;