/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'login',

    appFolder: "/login/app",
    //extend: 'login.Application',

    requires: [
        //'login.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'login.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to login.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});

Ext.onReady(function() {
    var userId = new Ext.form.TextField({
        name: "userId",
        fieldLabel: '用户名',
        padding: '5 5 5 5',
        value: "stophin",
        width: 230
    });
    var password = new Ext.form.TextField({
        name: "password",
        fieldLabel: '密码',
        value: "stophin",
        padding: '5 5 5 5',
        width: 230
    });
    var btn = new Ext.Button({
        text: "登录",
        handler: function() {
            panel.getForm().submit({
                success: function(form, data) {
                    window.location.href = "/linbdesktop";
                },
                failure: function(form, data) {
                    Ext.MessageBox.alert("登陆错误", data.response.responseText);
                }
            });
        }
    });
    var panel = Ext.create('Ext.form.Panel', {  
        url: "/login",
        border: false,
        items: [userId, password]
    });

    var win = Ext.widget('window', {
        title: "请登录",
        closable:false,
        modal: false,
        width: 300,
        height: 200,
        layout: 'fit',
        resizable: false,
        maximizable: false,
        items: panel,
        buttons: ['->', '-', btn]
    }).show();
    
    Ext.Ajax.request({
      url: '/logout',
      success: function(data) {
      }
    });
});