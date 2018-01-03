Ext.define('app.Demo.view.user.list', {
  extend: 'Ext.panel.Panel',
  id: "user-list",
  alias: 'widget.user-list',
  xtype: 'user-list',
  title: 'USER测试',
  closable:false,
  colseAction:'destory',
  layout: 'border',
  height: 500,

  controller: 'user',

  initComponent: function () {
    //var top = Ext.create("app.Demo.view.user.top");
    //var grid = Ext.create("app.Demo.view.user.grid");
    //this.items = [top, grid];
    this.items = [
      {xtype: 'user-top'},
      {xtype: 'user-grid'}
    ]
    this.callParent(arguments);
  }
});