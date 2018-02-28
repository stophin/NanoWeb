
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
	    modal: false,
	    width: 300,
	    height: 150,
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