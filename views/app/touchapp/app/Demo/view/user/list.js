Ext.define('touchapp.Demo.view.user.list', {
  extend: 'Ext.Panel',
  id: "user-list",
  alias: 'widget.user-list',
  xtype: 'user-list',
  title: '用户管理',
  closable:false,
  colseAction:'destory',
  layout: 'border',
  //height: 500,

  controller: 'user',

  initialize: function () {
    var top = Ext.create("touchapp.Demo.view.user.top");
    var grid = Ext.create("touchapp.Demo.view.user.grid");
    //this.items = [top, grid];
    this.items = top;
    //this.items = [
    //  {xtype: 'user-top'},
    //  {xtype: 'user-grid'}
    //]
    this.callParent(arguments);
  }
});