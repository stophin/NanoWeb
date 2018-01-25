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
      }
    });
    //this.callParent(arguments);
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
    var msn = "[" + actionString + "]";

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
      Ext.MessageBox.alert('请求成功', "成功: " + data.data);
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
      Ext.MessageBox.alert('请求成功', "成功: " + data.data);
    });
  },

  sendActionUS: function() {
    Ext.Ajax.request({
      url: "/service/dev/game/player/logouall",
      params: {},
      success: function(res, opts) {
        data = JSON.parse(res.responseText);
        if (data.success) {
            Ext.MessageBox.alert('请求成功', "成功");
        } else {
            Ext.MessageBox.alert('请求错误', "错误");
        }
      }, failure: function(res, opts) {
          Ext.MessageBox.alert('请求错误', res.responseText); 
      }
    })
  },

  sendRequest: function(data, callback) {
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
                data = data.data.data;
                var pos = {"ind": 0};
                var len = String.getUINT32(data, pos);
                var pro = String.getUINT32(data, pos);

                var buffer = "" + len + ":" + pro;
                Ext.MessageBox.alert('请求成功', "成功: " + buffer);
              } else {
                Ext.MessageBox.alert('请求错误', "错误: " + data.data);
              }
            }
        }, failure: function(res, opts) {
          debugger;
          Ext.MessageBox.alert('请求错误', res.responseText); 
        }
      });
  }
});
