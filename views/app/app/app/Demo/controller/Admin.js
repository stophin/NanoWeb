Ext.define("app.Demo.controller.Admin", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.admin',
  id: 'admin-controller',
  config: {
    name: 'Product Name'
  },

  //views: ['admin.list', 'admin.form'],

  init: function () {
    this.control({
      '#admin-list button[action=sendLogin]': {
        click: this.sendLogin
      },
      '#admin-list button[action=sendActionMSN]': {
        click: this.sendActionMSN
      },
      '#admin-list button[action=sendActionGS]': {
        click: this.sendActionGS
      },
      '#admin-list button[action=sendActionUS]': {
        click: this.sendActionUS
      },
      '#admin-list button[action=sendActionCF]': {
        click: this.sendActionCF
      },
      '#admin-list button[action=sendActionCGR_L]': {
        click: this.sendActionCGR_L
      },
      '#admin-list button[action=sendActionCGR_R]': {
        click: this.sendActionCGR_R
      },
      '#admin-list button[action=clearLogMsg]': {
        click: this.clearLogMsg
      }
    });
    //this.callParent(arguments);
    window.logMsgEl = null;
    window.bufferSize = 0;
    window.logMsgEx = function(data) {
      if (null == window.logMsg) {
        try {
          window.logMsg = $(Ext.getCmp("Msg").getEl().dom).find("textarea")[0]
          if (null == window.logMsg) {
            return;
          }
        } catch(e) {
          return;
        }
      }
        try {
          var BufferSize = Ext.getCmp("BufferSize");
          if (BufferSize.getErrors().length > 0) {
          } else {
            window.bufferSize = parseInt(BufferSize.getValue());
          }
        } catch(e) {
        }
      if (0 == window.bufferSize) {
        window.logMsg.value ="Invalid buffersize";
        return;
      }

      window.logMsg.value += data;
      window.logMsg.scrollTop = window.logMsg.scrollHeight;

      if (window.logMsg.value.length > window.bufferSize) {
        window.clearMsgEx();
      }
    }
    window.clearMsgEx = function() {
      if (null == window.logMsg) {
        try {
          window.logMsg = $(Ext.getCmp("Msg").getEl().dom).find("textarea")[0]
        } catch(e) {
          return;
        }
      }
      if (null == window.logMsg) {
        return;
      }

      window.logMsg.value ="";
      window.logMsg.scrollTop = window.logMsg.scrollHeight;
    }
    window.logSendMsg = function(data) {
      window.logMsgEx("You:" + data + "\n");
    };
    window.logResponseMsg = function(data) {
      window.logMsgEx("Res:" + data + "\n");
    };
    window.logErrorMsg = function(data) {
      window.logMsgEx("Err:" + data + "\n");
    };
  },

  clearLogMsg: function() {
    window.clearMsgEx();
  },

  sendLogin: function() {
    var password = "Rottacsgm!#((^)(@$)$";

    var data = "";
    var dataHeader = "";
    var protocolID = 100;
    data += String.fromUINT32(protocolID);
    data += String.fromUINT32(password.length);
    data += password;
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    this.sendRequest(data, null);
  },

  sendActionMSN: function() {
    var actionString = Ext.getCmp("actionString").getValue();
    if (actionString == "") {
      Ext.Msg.alert("错误", '请输入请求数据!', null, this);
      return;
    }
    var msn = "";
    actionString = actionString.split(",");
    for (var i = 0; i < actionString.length; i++) {
      msn  +="[" + actionString[i] + "]";
    }
    

    var data = "";
    var dataHeader = "";
    var protocolID = 101;
    data += String.fromUINT32(protocolID);
    data += String.fromUINT8(1);//can login
    data += String.fromUINT8(0);//can play
    data += String.fromUINT32(msn.length);//
    data += msn;
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    this.sendRequest(data, null);
  },

  sendActionGS: function() {
    var num = 1;
    //GSID, index, can play
    var settings = [
      {"GSID": 42, "index": 1, "play": 0}
    ];

    var data = "";
    var dataHeader = "";
    var protocolID = 102;
    data += String.fromUINT32(protocolID);
    data += String.fromUINT8(1);//set
    data += String.fromUINT32(num);//num
    for (var i = 0; i < num; i ++) {
      data += String.fromUINT32(settings[i].GSID);//
      data += String.fromUINT32(settings[i].index);//
      data += String.fromUINT8(settings[i].play);//
    }
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    this.sendRequest(data, function(data) {
      //Ext.MessageBox.alert('请求成功', "成功: " + data.data);
      window.logResponseMsg(data.data);
    });
  },
  sendActionCF: function() {

    var data = "";
    var dataHeader = "";
    var protocolID = 103;
    data += String.fromUINT32(protocolID);
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    this.sendRequest(data, function(data) {
      //Ext.MessageBox.alert('请求成功', "成功: " + data.data);
      window.logResponseMsg(data.data);
    });
  },

  sendActionUS: function() {
    var actionString = Ext.getCmp("actionString").getValue();
    if (actionString == "") {
      Ext.Msg.alert("错误", '请输入请求数据!', null, this);
      return;
    }

    window.logSendMsg(actionString);
    Ext.Ajax.request({
      url: "/service/dev/game/player/logout",
      method: "POST",
      params: {userId: actionString},
      success: function(res, opts) {
        data = JSON.parse(res.responseText);
        if (data.success) {
            //Ext.MessageBox.alert('请求成功', "成功");
            window.logResponseMsg("成功");
        } else {
            //Ext.MessageBox.alert('请求错误', "错误");
            window.logErrorMsg("错误");
        }
      }, failure: function(res, opts) {
          //Ext.MessageBox.alert('请求错误', res.responseText); 
          window.logErrorMsg(data.responseText);
      }
    })
  },
  sendActionCGR_L: function() {
    this.sendActionCGR("192.168.3.37");
  },
  sendActionCGR_R: function() {
    this.sendActionCGR("192.168.43.128");
  },
  sendActionCGR: function(ip) {
    if (null == ip) {
      Ext.Msg.alert("错误", '没有输入ip!', null, this);
      return;
    }
    var actionString = Ext.getCmp("actionString").getValue();
    if (actionString == "") {
      Ext.Msg.alert("错误", '请输入请求数据!', null, this);
      return;
    }

    var data = "";
    var dataHeader = "";
    data += String.fromUINT32(0);
    var _actionString = String.fromUnicode(actionString);
    data += String.fromUINT32(_actionString.length);
    data += _actionString;
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    window.logSendMsg(actionString);
    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: ip, port: '9005', data: data},
        success: function(res, opts) {
          data = JSON.parse(res.responseText);
          if (data.success) {
            //Ext.MessageBox.alert('请求成功', "成功: " + data.data);
            window.logResponseMsg(data.data);
          } else {
            //Ext.MessageBox.alert('请求失败', "失败: " + data.data);
            window.logErrorMsg(data.data);
          }
        }, failure: function(res, opts) {
          //Ext.MessageBox.alert('请求错误', res.responseText); 
          window.logErrorMsg(res.responseText);
        }
      });
  },

  sendRequest: function(data, callback) {
    window.logSendMsg(data);
    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: '192.168.3.37', port: '20003', data: data},
        success: function(res, opts) {
          debugger;
            data = JSON.parse(res.responseText);
            if (callback) {
              callback(data);
            } else {
              if (data.success) {
                data = data.data;
                var pos = {"ind": 0};
                var len = String.getUINT32(data, pos);
                var pro = String.getUINT32(data, pos);

                var buffer = "" + len + ":" + pro;
                //Ext.MessageBox.alert('请求成功', "成功: " + buffer);
                window.logResponseMsg(buffer);
              } else {
                //Ext.MessageBox.alert('请求错误', "错误: " + data.data);
                window.logErrorMsg(data.data);
              }
            }
        }, failure: function(res, opts) {
          debugger;
          //Ext.MessageBox.alert('请求错误', res.responseText); 
          window.logErrorMsg(res.responseText);
        }
      });
  }
});
