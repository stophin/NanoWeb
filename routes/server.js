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

/////////////////////////////////////////////////////////
////Forest Sprite or SpeedTime
//这下面时同步机制
//因为await sync不是很正确，先暂时这样
let g_SaveDataSzJson = [];
let g_waitingForFinish = 0;
let g_waitingForFinishCounter = 0;
let g_param = {};
var Save = async(data, szJson)=> {
	g_SaveDataSzJson.push({data:data, szJson: szJson});
};

var SaveInterval = async()=> {
	if (g_SaveDataSzJson.length <= 0) {
		return;
	}
	if (g_waitingForFinish == 1) {
		console.log("********g_waitingForFinish********");
		//等待太久则自动停止等待，防止死锁
		if (g_waitingForFinishCounter ++ > 100) {
			g_waitingForFinishCounter = 0;
			console.log("********waiting too mush times********");
			//记录该条死锁数据
			//假设该条操作是永远不会卡死的
			await server.save(g_param).then(()=>{
				console.log("********core dump finished！********");
				g_waitingForFinish = 0;
			});
		}
		return;
	}
	g_waitingForFinish = 1;
	let SaveDataSzJson = g_SaveDataSzJson.shift();
	let data = SaveDataSzJson.data;
	let szJson = SaveDataSzJson.szJson;
	
    let records = data.records;
    const buffer = Buffer.from(records, 'base64');
    await zlib.unzip(buffer, async(err, buffer) => {
	    if (!err) {
	    	records_r = buffer.toString();
	        console.log(records_r);

	        let gameKey = "c0f81e04-bb6b-4b8e-9c9b-6fb2220547c6";
	        let obj = JSON.parse(records_r);
	        let params = [];
		    if (data.exit) {//退出
			    console.log("用户:" + data.userId );
			    console.log("退出");
		    }
	       	if (data.gameType) {//有gameType的是战绩
		        for (key in obj) {
		        	switch(obj[key].gameId) {
		        		case 50001:
		        			console.log("森林小妖");
		        			break;
		        		case 50002:
		        			console.log("极速时刻");
		        			break;
		        		case 50003:
		        			console.log("疯狂水果");
		        			break
		        		default:
		        			console.log("(未识别)");
		        			break;
		        	}
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
		        	switch(data.gameId) {
		        		case 50001:
		        			console.log("森林小妖");
		        			break;
		        		case 50002:
		        			console.log("极速时刻");
		        			break;
		        		case 50003:
		        			console.log("疯狂水果");
		        			break
		        		default:
		        			console.log("(未识别)");
		        			break;
		        	}
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

		        	params.push({"gameId":data.gameId, "userId": obj[key].userId, "dGold": obj[key].amount, "tTime": obj[key].createdAt})
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
			g_param = {};
			g_param.sign = data.sign;
			g_param.n32IsSuccess = 1;
			g_param.n32ProtocolId = 1;
			g_param.gameId = data.gameId || 0;
			g_param.gameType = data.gameType || 0;
			g_param.timestamp = data.timestamp;
			g_param.exit = data.exit || 0;
			g_param.userId = data.userId || 0;
			g_param.roundId = data.roundId || 0;
			g_param.zlib = data.zlib || 0;
			g_param.szJson = szJson;
			g_param.szRecords = records_r;
			g_param.szRecords_c = records;
			//server.save(param);

			if (data.exit) {
			    //用户退出时修改用户状态
			    let result = await server.playerChange({"userId": data.userId, "sid": 0});
			    //结算用户总分数
			    result = await server.playerAccount({"gameId": data.gameId, "userId": data.userId}).then(()=>{g_waitingForFinish = 0});;
			} else {
				if (params.length > 0) {
					//累计用户分数
					let result = await server.playerAccumulate(params).then(()=>{g_waitingForFinish = 0;});
				} else {
					g_waitingForFinish = 0;
				}
			}
	    } else {
	        // handle error
	        console.log("unzip error:" + err);

			g_waitingForFinish = 0;
	    }
	});
};
setInterval(SaveInterval, 100);

router.post('/service/game/settlement',async (ctx,next)=>{
    let data=ctx.request.body;
    let szJson = JSON.stringify(data);
    console.log("msg from settlement:" + szJson);
    await Save(data, szJson);
	ctx.body = {"code":"0","msg":"success!"};
});

router.post('/service/game/player/record',async (ctx,next)=>{
    let data=ctx.request.body;
    let szJson = JSON.stringify(data);
    console.log("msg from player/record:" + szJson);
    await Save(data, szJson);
	ctx.body = {"code":"0","msg":"success!"};
});
/////////////////////////////////////////////////////////
//TCP client connector
function sleep(client, ms) {
  return new Promise(resolve => {
  	client.wrapper.resolve = resolve;
  	client.wrapper.timer = setTimeout(resolve, ms)
  });
}
const iconv = require('iconv-lite');
const net = require('net');
var clients = [];
router.post("/request", async(ctx, next)=> {
    let host = ctx.request.body.host;
    let port = ctx.request.body.port;
    let data = ctx.request.body.data;
    let server = host + ":" + port;
    let client = clients[server];
	if (null == client) {
		console.log("Connecting to " + server + " ...");
		client = new net.Socket({"allowHalfOpen": false});
		if (null != client) {
			clients[server] = client;
			client.connect(port, host, function() {
				console.log("Connection " + server + " success.");
			})
			client.on("error", function(data) {
				console.log("Error: " + data);
				clients[server] = null;
			});
			//保持连接接收服务器返回的数据
			//这个事件只能写一次，否则会出现多个event listener
			client.on('data', async (data) => {
			  	console.log("Res Data: " + data.toString());
			  	if (!client.wrapper) {
			  		return;
			  	}
			  	client.wrapper.rawData = data.toString();
			  	//提前完成promise
			  	//首先clear timer，但是这样promise永远没法完成
			  	//为了解决这个问题使用保存的resolve调用完成promise
			  	//完成后将调用promise的then执行
			  	clearTimeout(client.wrapper.timer);
			  	client.wrapper.resolve();
			})
		}
	}
	if (client) {
		//还在等待上一次完成
		if (client.wrapper) {
			ctx.body = {"success": "", "data": "Waiting for last finish!"};
		} else {
			console.log("Posted to " + server + " ");
			console.log("Data: " + data);
			//use binary to encode the stream
			client.write(new Buffer(data, 'binary'));
			//这里停顿一会儿等待返回数据
			//设置等待结构
			client.wrapper = {};
			client.wrapper.rawData = null;
			client.wrapper.promise = sleep(client, 3000);
			//完成
			await client.wrapper.promise.then(()=>{
				if (client.wrapper.rawData) {
					ctx.body = {"success": "true", "data": client.wrapper.rawData};
				} else {
					ctx.body = {"success": "", "data": "No data returned!"};
				}
				client.wrapper = null;
			});
		}
	}
	else {
		ctx.body = {"success": ""};
	}
})

/////////////////////////////////////////////////////////
//Cook or ROT and so on
router.all('/service/authuser',async (ctx,next)=>{
	console.log(JSON.stringify( ctx.request.body));
	ctx.body = {
	  "code": 0,
	  "payload": {
	  	"userBalance": "148568752156",
	  	"betLevel": 12,
	  	"lineLevel": 1234,
	  	"token": "123",
	  	"betcfg": [
	  		123.0, 23.4
	  	],
	  	"linecfg": 134,
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
	        "gold": 156
	      }
	    }
	  }
	};
});

router.post('/service/spin',async (ctx,next)=>{
	console.log(JSON.stringify( ctx.request.body));
	ctx.body = {
	  "code": 0,
	  "payload": {
	    "userBalance": "148568752156",
	    "viewGrid": [
	    	"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"
	    ],
	    "winGrid": [
	    ],
	    "winLevel": "34",
	    "winNodes": [
	    	12.3, 13.4
	    ],
	    "getFeatureChance": 1,
	    "scatterGrid": [
	    	133, 123, 144
	    ],
	    "totalGold": 1234.5,
	    "scatterGold": 17.5,
	    "betLevel": 1234,
	    "lineLevel": 564,
	    "token": "123",
	    "betcfg": [
	  		123.0, 23.4
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
	        "gold": 587
	      }
	    }
	  }
	}
});
router.post('/service/choosebuff',async (ctx,next)=>{
	console.log(JSON.stringify( ctx.request.body));
	ctx.body = {
	  "code": 0,
	  "payload": {
	  	"featureData": {
	      "buff": "313",
	      "freeSpinRemainCount": 0
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
router.get('/service/dev/getSnInfo/:msn', async(ctx, next) => {
	let msn = ctx.params.msn;

	ctx.body = JSON.stringify({
		"url": "http://192.168.3.37/service/xmobile/na/reg",
		"msn": msn,
		"state": 0,
		"img": {
			"logo": ["http://192.168.3.37/images/logo-image.png", "http://192.168.3.37/images/logo-inner.png"],
			"name": ["http://192.168.3.37/images/logo-image.png", "http://192.168.3.37/images/logo-inner.png"]
		},
		"code": "0"
	});
})
router.get('/NAGame/getConfig',async (ctx,next)=>{

    var filename = "/NAGame/NALiveConfig.json";
	var content = fs.readFileSync("./public" + filename,'utf-8');

	console.log(content);
	ctx.body = content;
});
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//HA
router.all('/service/dev/game/tool/list',async (ctx,next)=>{
	ctx.body = {"code": 0, "msg": "",
		"list": [
		]
	};
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
	console.log(JSON.stringify( ctx.request.body));
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
	console.log(JSON.stringify( ctx.request.body));
	result = await server.modifyInfo(param)
	if (result != null) {
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
	console.log(JSON.stringify( ctx.request.body));
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
	console.log(JSON.stringify( ctx.request.body));
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
		        "state": result0.un32CurGSID == 0 ? 1 : 0//不在任何游戏服务器中，则已清账
		    }
		};

		//修改用户状态
		result = await server.playerChange(param);

		//已清账
		if (result0.un32CurGSID == 0) {
			//清除上次用户历史记录
			await server.deleteAccountHist(param);
		}

		ctx.body = JSON.stringify(json);
	} else {
		ctx.body = JSON.stringify({"code": 9002, "msg": ""});
	}
});

router.all('/service/logout', async(ctx, next)=> {
	console.log(JSON.stringify(ctx.request.body));
	console.log(JSON.stringify(ctx.header));
	console.log(JSON.stringify(ctx.headers));

	ctx.body = JSON.stringify({"code": 0, "msg": ""});
})


router.all('/service/dev/game/player/logout',async (ctx,next)=>{
	var param = {userId: ctx.request.body.userId};
	//退出用户所在游戏
	result = await server.playerLogout(param);
	ctx.body = {"success": "true"};
});


/////////////////////////////////////////////////////////
module.exports = router;