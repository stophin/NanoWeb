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

    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: '192.168.3.37', port: '20003', data: data},
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
      });
  },

  sendActionMSN: function() {
    var msn = "[555]";

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

    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: '192.168.3.37', port: '20003', data: data},
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
      });
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

    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: '192.168.3.37', port: '20003', data: data},
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
  }
});
