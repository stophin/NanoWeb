Ext.define('Demo.view.json.list', {
  extend: 'Ext.panel.Panel',
  id: "json-list",
  alias: 'widget.json-list',
  title: 'JSON测试',
  closable:true,
  colseAction:'destory',
  layout: 'border',

  initComponent: function () {
    var top = Ext.create("Demo.view.json.top");
    var grid = Ext.create("Demo.view.json.grid");
    this.items = [top, grid];
    this.callParent(arguments);
  }
});