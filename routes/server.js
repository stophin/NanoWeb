/**
 * Created by stophin on 2017/12/27
 */

const Server = require('../modules/server');
const router = require('koa-router')();
var mime = require("mime");
var fs = require('fs');
var xlsx = require('node-xlsx'); 
var bodyParse =require('koa-body');
var zlib = require('zlib');
var crypto = require('crypto');
const moment=require('moment')
var newDate = new Date();
var server = new Server();


router.get('/service/game/jsontest', async(ctx, next)=> {

	let gameKey = "c0f81e04-bb6b-4b8e-9c9b-6fb2220547c6";
	let data = {};
	data.gameId = 50001;
	data.gameType = 50000;
	data.records = "eJyNkV1rwyAYhf+L12/K61eMuWu2m8I+oA1sY5RhqillbTISA4Ox/z6NpfRigyGCx/ecwyO+fpFpdMPKklKh1krArB/MyZGS3NRI39aPdb2kSIA0zkcj2dw9v1TJjsgksvlYKCmTqT7ENJWUa1ZwFEWOQPahMqYlIlIgH2ZwXapTqqHMOp41UvNMcLSZlm2biR3VKG0h2G5HUsFmahLauWXo+9PqlpQBIoqps7O68AAZvRl+B5rta+PdSMpXlgNnwAugEqgGRkEDpUAZSFBQAIt7ew5VzseMAPx7XXvr3pvjPwL73hxXnXWfwZsHknDV9N003vc24GfhvYfx6dClo4+liUQsENO/zVO8yMp075Vr+yHEeU4lFwt1NVq23g1Xk+/tDwpujU4=";
	data.timestamp = 1513928304860;

	//计算签名是否正确
	let signValue = "gameType" + data.gameType + "records" + data.records +"timestamp" + data.timestamp;
	signValue = encodeURIComponent(signValue);
	console.log(signValue);
	signValue = gameKey + signValue + gameKey;
	let cryptoed = crypto.createHash('sha256').update(signValue).digest('hex');
	console.log(cryptoed);
	console.log(cryptoed == data.sign);
});

/////////////////////////////////////////////////////////
////Forest Sprite or SpeedTime
function Save(data, szJson) {
    let records = data.records;
    const buffer = Buffer.from(records, 'base64');
    zlib.unzip(buffer, (err, buffer) => {
	    if (!err) {
	    	records_r = buffer.toString();
	        console.log(records_r);

	        let gameKey = "c0f81e04-bb6b-4b8e-9c9b-6fb2220547c6";
	        let obj = JSON.parse(records_r);
		    if (data.exit) {//退出
			    console.log("用户:" + data.userId );
			    console.log("退出");
		    }
	        else if (data.gameType) {//有gameType的是战绩
		        for (key in obj) {
		        	console.log("房间:" + obj[key].roomID);
		        	console.log("用户:" + obj[key].userName + "(" + obj[key].userId + ")");
		        	console.log("分数:" + obj[key].userBankBefore);
		        	console.log("特殊:" + (obj[key].bonusMode < 0 ? "否" : "是"));
		        	console.log("中奖:" + (obj[key].isWin < 0 ? "未中奖" : "中奖！"));
		        	console.log("赌注:" + "下注:" + obj[key].totalBets + ",输赢:" + obj[key].userWin);
		        	console.log("剩余:" + obj[key].userBankAfter);
		        }

	        } else if (data.gameId) {//有gameId的是流水
		        for (key in obj) {
		        	console.log("房间:" + obj[key].tableId);
		        	console.log("用户:" + obj[key].userId );
		        	console.log("分数:" + obj[key].preBalance);
		        	if (obj[key].type == 3) {
		        		console.log("下注:" + obj[key].amount);
		        	} else if (obj[key].type == 4) {
		        		console.log("获得:" + obj[key].amount);
		        	} else if (obj[key].type == 5) {
		        		console.log("返还:" + obj[key].amount);
		        	}
		        	console.log("剩余:" + (obj[key].preBalance + obj[key].amount) );
		        }
	        }
	        //显示时间
	        console.log("时间戳：" + data.timestamp);
	        newDate.setTime(data.timestamp);
	        console.log(newDate.toLocaleString());
	        //计算签名是否正确
	        let signValue = (data.gameType ? ("gameType" + data.gameType) : ("gameId" + data.gameId)) + "records" + data.records +"timestamp" + data.timestamp;
	        signValue = encodeURIComponent(signValue);
	        //console.log(signValue);
	        signValue = gameKey + signValue + gameKey;
	        let cryptoed = crypto.createHash('sha256').update(signValue).digest('hex');
	        console.log(cryptoed);
	        console.log(cryptoed == data.sign ? "签名正确": ">>>>>>>>>>>>>>>>>>签名错误！>>>>>>");

			//store in DB
			let n32ProtocolId = 1;
			let param = {};
			param.sign = data.sign;
			param.n32IsSuccess = 1;
			param.n32ProtocolId = 1;
			param.gameId = data.gameId || 0;
			param.gameType = data.gameType || 0;
			param.timestamp = data.timestamp;
			param.exit = data.exit || 0;
			param.userId = data.userId || 0;
			param.roundId = data.roundId || 0;
			param.zlib = data.zlib || 0;
			param.szJson = szJson;
			param.szRecords = records_r;
			param.szRecords_c = records;
			server.save(param);
	    } else {
	        // handle error
	        console.log("unzip error:" + err);
	    }
	});
}

router.post('/service/game/settlement',async (ctx,next)=>{
    let data=ctx.request.body;
    let szJson = JSON.stringify(data);
    console.log("msg from settlement:" + szJson);
    Save(data, szJson);
	ctx.body = {"code":"0","msg":"success!"};
});

router.post('/service/game/player/record',async (ctx,next)=>{
    let data=ctx.request.body;
    let szJson = JSON.stringify(data);
    console.log("msg from player/record:" + szJson);
    Save(data, szJson);
	ctx.body = {"code":"0","msg":"success!"};
});
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Coook or ROT and so on
router.all('/service/authuser',async (ctx,next)=>{
	ctx.body = {"code":"0","msg":"success!"};
});

router.post('/service/spin',async (ctx,next)=>{
	ctx.body = {
	    "code": 0,
	    "payload": {
	        "userBalance": "123",
	        "betLevel": 1234,
	        "lineLevel": 123,
	        "token": "123",
	        "betcfg": [
	            1
	        ],
	        "linecfg": 1,
	        "featureData": {
	            "buff": "313",
	            "freeSpinRemainCount": 0,
	            "featureChanceCount": 0,
	            "featureMultiplier": 223,
	            "featureRoundGold": "343",
	            "featureBonusData": {
	                "grid": [
	                    12
	                ],
	                "gold": 123
	            }
	        }
	    }
	};
});
router.post('/service/choosebuff',async (ctx,next)=>{
	ctx.body = {
	    "code": 0,
	    "payload": {
	        "userBalance": "123",
	        "betLevel": 1234,
	        "lineLevel": 123,
	        "token": "123",
	        "betcfg": [
	            1
	        ],
	        "linecfg": 1,
	        "featureData": {
	            "buff": "313",
	            "freeSpinRemainCount": 0,
	            "featureChanceCount": 0,
	            "featureMultiplier": 223,
	            "featureRoundGold": "343",
	            "featureBonusData": {
	                "grid": [
	                    12
	                ],
	                "gold": 123
	            }
	        }
	    }
	};
});
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//GameEntry
router.get('/NAGame/fileReader',async (ctx,next)=>{
	console.log(ctx.query.filename);

    var filename = ctx.query.filename;
	var content = fs.readFileSync("./public" + filename,'utf-8');

	console.log(content);
	ctx.body = content;
});
router.get('/service/dev/ipquery',async (ctx,next)=>{
	ctx.body = "\"country_id\":\"CN\"";
});
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//HA
router.all('/service/dev/game/tool/list',async (ctx,next)=>{
	ctx.body = {"code": 0, "msg": ""};
});
router.all('/service/dev/game/package/list',async (ctx,next)=>{
	ctx.body = {"code": 0, "msg": "",
		"list": [
		]
	};
});
router.all('/service/dev/game/login',async (ctx,next)=>{
	var param = {};
	param.userName = ctx.request.body.userName;
	param.password = ctx.request.body.userPwd;
	param.merchantId = ctx.request.body.msn;
	result = await server.login(param)
	if (result.length > 0) {
		let result0 = result[0];
		let json = {
		    "code": 0,
		    "msg": "",
		    "data": {
		    	"token": "",
		        "balance": result0.dGold,
		        "msn": result0.merchantId,
		        "createAt": result0.tRegisteUTCMilsec,
		        "updateAt": result0.tLastLoginUTCMilsec,
		        "sex": result0.bSex,
		        "vedioMix": "",
		        "liveMix": "",
		        "username": result0.szUserName,
		        "nickname": result0.szNickName,
		        "headPic": result0.szHeaderIconURL,
		        "parentId": result0.parentId,
		        "userId": "" + result0.un32UserID ,
		        "sid": "" + result0.un32CurGSID,
		        "gameId": "5000"
		    }
		};
		ctx.body = JSON.stringify(json);
	} else {
		ctx.body = JSON.stringify({"code": 9002, "msg": ""});
	}
});
router.all('/service/dev/game/player/info',async (ctx,next)=>{
	var param = {};
	param.userId = ctx.request.body.userId;
	param.nickname = ctx.request.body.nickname;
	param.headPic = ctx.request.body.headPic;
	param.sex = ctx.request.body.sex;
	result = await server.modifyInfo(param)
	if (result.length > 0) {
		let result0 = result[0];
		let json = {
		    "code": 0,
		    "msg": ""
		};
		ctx.body = JSON.stringify(json);
	} else {
		ctx.body = JSON.stringify({"code": 9002, "msg": ""});
	}
});
router.all('/service/dev/merchant/info',async (ctx,next)=>{
	var param = {};
	param.parentId = ctx.request.body.parentId;
	result = await server.merchantInfo(param)
	if (result.length > 0) {
		let result0 = result[0];
		let json = {
		    "code": 0,
		    "msg": "",
		    "username": result0.username,
		    "role": result0.role,
		    "id": "" + result0.mid,
		    "sn": "" + result0.msn,
		    "nickname": result0.nickname,
		    "headPic": result0.headPic,
		    "merUrl" : "",
		    "moneyURL": "",
		    "registerURL": "",
		    "parentId": result0.mid,
		    "levelIndex": "" + result0.levelIndex,
		    "suffix": "",
		    "liveMix": 100,
		    "vedioMix": 123,
		    "rate": 0.5,
		    "msn":  result0.msn,
		    "gameList": [
		    	"10000",
		    	"20000",
				"30000",
				"40000",
				"50000",
				"1010000",
				"1020000",
				"1030000",
				"1040000",
				"1050000",
				"1060000",
				"1070000",
				"1080000",
				"1090000"
			]
		};
		ctx.body = JSON.stringify(json);
	} else {
		ctx.body = JSON.stringify({"code": 9002, "msg": ""});
	}
});


router.all('/service/dev/game/player/join',async (ctx,next)=>{
	var param = {};
	param.userId = ctx.request.body.userId;
	param.gameId = ctx.request.body.gameId;
	param.sid = ctx.request.body.sid;
	result = await server.playerJoin(param)
	if (result.length > 0) {
		let result0 = result[0];
		let json = {
		    "code": 0,
		    "msg": "",
		    "data": {
		        "balance": result0.dGold,
		        "sid": result0.parentId,
		        "gameId": param.gameId ,
		        "state": "1"
		    }
		};
		ctx.body = JSON.stringify(json);
	} else {
		ctx.body = JSON.stringify({"code": 9002, "msg": ""});
	}
});


/////////////////////////////////////////////////////////
module.exports = router;