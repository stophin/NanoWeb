Ext.define('app.Demo.view.json.list', {
  extend: 'Ext.panel.Panel',
  id: "json-list",
  //alias: 'widget.json-list',
  xtype: 'json-list',
  title: 'JSON测试',
  closable:false,
  colseAction:'destory',
  layout: 'border',
  height: 500,

  controller: 'json',

  initComponent: function () {
    var top = Ext.create("app.Demo.view.json.top");
    var grid = Ext.create("app.Demo.view.json.grid");
    this.items = [top, grid];
    this.callParent(arguments);
  }
});