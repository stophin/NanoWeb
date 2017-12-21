/**
 * Created by siminfang on 2017/10/23.
 */

const Server = require('../modules/server');
const router = require('koa-router')();
var mime = require("mime");
var fs = require('fs');
var bodyParse =require('koa-body');
var zlib = require('zlib');
const moment=require('moment')

function Save(data, szJson) {
    let records = data.records;
    console.log("records:" + records);
    const buffer = Buffer.from(records, 'base64');
    zlib.unzip(buffer, (err, buffer) => {
	    if (!err) {
	    	records_r = buffer.toString();
	        console.log(records_r);

	        let obj = JSON.parse(records_r);
		    if (data.exit) {//退出
			    console.log("用户:" + data.userId );
			    console.log("退出");
		    }
	        else if (data.gameType) {//有gameType的是战绩
		        for (key in obj) {
		        	console.log("用户:" + obj[key].userName + "(" + obj[key].userId + ")");
		        	console.log("分数:" + obj[key].userBankBefore);
		        	console.log("特殊:" + (obj[key].bonusMode < 0 ? "否" : "是"));
		        	console.log("中奖:" + (obj[key].isWin < 0 ? "未中奖" : "中奖！"));
		        	console.log("赌注:" + "下注:" + obj[key].totalBets + ",输赢:" + obj[key].userWin);
		        	console.log("剩余:" + obj[key].userBankAfter);
		        }
	        } else if (data.gameId) {//有gameId的是流水
		        for (key in obj) {
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

			//store in DB
			let n32ProtocolId = 1;
			data.n32IsSuccess = 1;
			data.n32ProtocolId = 1;
			data.gameId = data.gameId || 0;
			data.gameType = data.gameType || 0;
			data.exit = data.exit || 0;
			data.userId = data.userId || 0;
			data.roundId = data.roundId || 0;
			data.zlib = data.zlib || 0;
			data.szJson = szJson;
			data.szRecords = records_r;
			data.szRecords_c = records;
			let server = new Server(data);
			server.save();
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


module.exports = router;