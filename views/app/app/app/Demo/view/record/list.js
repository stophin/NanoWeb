Ext.define('app.Demo.view.record.list', {
  extend: 'Ext.panel.Panel',
  id: "record-list",
  alias: 'widget.record-list',
  xtype: 'record-list',
  title: '用户记录',
  closable:false,
  colseAction:'destory',
  layout: 'border',
  height: 500,

  controller: 'record',

  initComponent: function () {
    //var top = Ext.create("app.Demo.view.record.top");
    //var grid = Ext.create("app.Demo.view.record.grid");
    //this.items = [top, grid];
    this.items = [
      {xtype: 'record-top'},
      {xtype: 'record-grid'}
    ]
    this.callParent(arguments);
  }
});