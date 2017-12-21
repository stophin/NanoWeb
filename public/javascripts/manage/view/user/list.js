Ext.define('Demo.view.user.list', {
  extend: 'Ext.panel.Panel',
  id: "user-list",
  alias: 'widget.user-list',
  title: '用户管理',
  closable:true,
  colseAction:'destory',
  layout: 'border',

  initComponent: function () {
    var top = Ext.create("Demo.view.user.top");
    var grid = Ext.create("Demo.view.user.grid");
    this.items = [top, grid];
    this.callParent(arguments);
  }
});