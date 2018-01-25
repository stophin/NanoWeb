
Ext.define('app.Demo.view.admin.top', {
  extend: 'Ext.panel.Panel',
  id: "admin-top",
  alias: 'widget.admin-top',
  xtype: 'admin-top',
  //title: 'Search Admins',
  region: 'north',
  border: false,
  //style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        items: [{
          labelWidth: 0,
          fieldWidth: 50,
          padding: '5 5 5 5',
          xtype: 'textfield',
          id: 'actionString',
          name: 'actionString'
        }],
        buttons: [{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '登录GM',
         icon: 'images/send.png',
         action: 'sendLogin'
       }, {
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: 'MSN启用',
         icon: 'images/send.png',
         action: 'sendActionMSN'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: 'GS启用',
         icon: 'images/send.png',
         action: 'sendActionGS'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '退出所有用户',
         icon: 'images/send.png',
         action: 'sendActionUS'
       }, '->'],
        resetForm: function() {
            this.items.each(function() {
              this.setValue();
            })
        }
      }]
      this.callParent(arguments);
    }
});
