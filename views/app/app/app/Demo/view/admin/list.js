Ext.define('app.Demo.view.admin.list', {
  extend: 'Ext.panel.Panel',
  id: "admin-list",
  alias: 'widget.admin-list',
  xtype: 'admin-list',
  title: '管理界面',
  closable:false,
  colseAction:'destory',
  layout: 'border',
  height: 500,

  controller: 'admin',
  
  initComponent: function () {

    this.items = [
      {xtype: 'admin-top'},
      {xtype: 'admin-grid'}
    ]
    this.callParent(arguments);
  }
});