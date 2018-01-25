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
    let result=await dbHelper.execute(sqlStr, params, 1);
    await dbHelper.stop();
    return result;
};


//登陆
Server.prototype.login = async function(param) {
    await dbHelper.start();
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
    await dbHelper.start();
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
    await dbHelper.start();
	let sqlStr = "select * from na_merchant_web where ";
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
    await dbHelper.start();
	let sqlStr = "select * from na_gameuser ";
	sqlStr += "  where un32UserId = ?;"
	let params = [
		param.userId
	];
	let result = await dbHelper.executemain(sqlStr, params);
	console.log(JSON.stringify(result));
	await dbHelper.stop();

	return result;
}

//修改用户状态
Server.prototype.playerChange = async function(param) {
    await dbHelper.start();
	let sqlStr = "update na_gameuser set un32CurGSID = ?";
	sqlStr += " where un32UserId = ?;";
	let params = [
		param.sid,
		param.userId
	];
	let result = await dbHelper.executemain(sqlStr, params);

	await dbHelper.stop();
}

//退出所有用户所在游戏
Server.prototype.playerLogoutAll = async function(param) {
    await dbHelper.start();
	let sqlStr = "update na_gameuser set un32CurGSID = 0;";
	let result = await dbHelper.executemain(sqlStr, {});

	await dbHelper.stop();
}

//累计用户分数
let g_result = {};
let g_userinfo = {};
Server.prototype.playerAccumulate = async function(param) {
    await dbHelper.start();
	for (key in param) {
		let sqlStr = "select * from na_user_change_web";
		sqlStr += " where un32UserId = ?";
		sqlStr += " and un32GameId = ?;";
		let params = [
			param[key].userId,
			param[key].gameId
		];
		await dbHelper.execute(sqlStr, params).then(async(result)=>{
			g_result = result;
			sqlStr = "select * from na_gameuser";
			sqlStr += " where un32UserId = ?";
			params = [
				param[key].userId
			];
			g_userinfo = await dbHelper.executemain(sqlStr, params).then(async(result)=>{
				g_userinfo = result;
				//history
				//sqlStr = "replace na_user_change_hist_hist_web set dGold = dGold + ?";
				//sqlStr += ", un32UserId = ?;";
				sqlStr = "insert into na_user_change_hist_web set dGold = ?";
				sqlStr += ", un32UserId = ?";
				sqlStr += ", un32GameId = ?";
				sqlStr += ", tTime = ?";
				sqlStr += ", dGoldHist = ?";
				sqlStr += ", dGoldLast = ?";
				sqlStr += " on duplicate key update dGold = dGold + VALUES(dGold);";
				let lastGold = 0;
				if (g_result.length > 0) {
					lastGold += g_result[0].dGold;
				}
				let curGold = 0;
				if (g_userinfo.length > 0) {
					curGold += g_userinfo[0].dGold;
				}
				params = [
					param[key].dGold,
					param[key].userId,
					param[key].gameId,
					param[key].tTime,
					lastGold + curGold + param[key].dGold,
					lastGold + param[key].dGold
				];
				await dbHelper.execute(sqlStr, params).then(async()=>{
					//accumulation
					sqlStr = "";
					if (g_result.length > 0) {
						sqlStr += " update ";
						sqlStr += " na_user_change_web set dGold = dGold + ?";
						sqlStr += " , dGoldLast = ?";
						sqlStr += " , tTime = ?";
						sqlStr += " where un32UserId = ?";
						sqlStr += " and un32GameId = ?;";
						params = [
							param[key].dGold,
							param[key].dGold,
							param[key].tTime,
							param[key].userId,
							param[key].gameId
						];
					} else {
						sqlStr += " insert into ";
						sqlStr += " na_user_change_web set dGold = dGold + ?";
						sqlStr += " , dGoldLast = ?";
						sqlStr += ", tTime = ?";
						sqlStr += ", un32UserId = ?";
						sqlStr += ", un32GameId = ?;";
						params = [
							param[key].dGold,
							param[key].dGold,
							param[key].tTime,
							param[key].userId,
							param[key].gameId
						];
					}
					result = await dbHelper.execute(sqlStr, params);
				});
			});
		});
	}
	await dbHelper.stop();
}

//结算用户总分数
Server.prototype.playerAccount = async function(param) {
    await dbHelper.start();
	let sqlStr = "select * from na_user_change_web";
	sqlStr += " where un32UserId = ?";
	sqlStr += " and un32GameId = ?;";
	let params = [
		param.userId,
		param.gameId
	];
	await dbHelper.execute(sqlStr, params).then(async(result)=> {
		console.log(JSON.stringify(result));
		if (result.length > 0) {
			let key = 0;
			let sqlStr = "update na_gameuser set dGold = dGold + ?";
			sqlStr += " where un32UserId = ?;";
			let params = [
				result[key].dGold,
				result[key].un32UserId
			];
			await dbHelper.executemain(sqlStr, params);

			//设置为0防止多次接收退出消息造成多次金币增加
			let delStr = "update na_user_change_web set dGoldHist = dGoldHist + dGold";
			delStr += ", dGold = 0"
			delStr += " where un32UserId = ?";
			delStr += " and un32GameId = ?;";
			let delParams = [
				result[key].un32UserId,
				result[key].un32GameId
			]
			await dbHelper.execute(delStr, delParams);
		}
	})
	await dbHelper.stop();
}

//清除上次用户历史记录
Server.prototype.deleteAccountHist = async function(param) {
	//需要通过sid查找GameKindID
	let sqlStr = "select * from na_gameserver ";
	sqlStr += " where un32GameServerID = ?;";
	let params = [
		param.sid
	];
	let result = await dbHelper.executemain(sqlStr, params);

	if (result.length > 0) {
		let delStr = "delete from na_user_change_hist_web ";
		delStr += " where un32UserId = ?";
		delStr += " and un32GameId = ?;";
		let delParams = [
			param.userId,
			result[0].un32GameKindID
		]
		await dbHelper.execute(delStr, delParams);
	}
}

module.exports = Server;