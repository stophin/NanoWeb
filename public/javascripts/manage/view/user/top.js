
Ext.define('Demo.view.user.top', {
  extend: 'Ext.panel.Panel',
  id: "user-top",
  alias: 'widget.user-top',
  //title: 'Search Users',
  region: 'north',
  border: false,
  style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        items: [{
          labelWidth: 50,
          fieldWidth: 50,
          padding: '5 5 5 5',
          xtype: 'textfield',
          name : 'name',
          fieldLabel: '用户名'
        }],
        buttons: [{
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          xtype: 'button',
          text: '导入用户配置',
          icon: 'images/Import.png',
          action: 'importUser'
        },{
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          xtype: 'button',
          text: '导出用户配置',
          icon: 'images/Export.png',
          action: 'exportUser'
        }, {
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          xtype: 'button',
          text: '检索',
          icon: 'images/search.png',
          action: 'searchUser'
        },{
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          xtype: 'button',
          text: '清除',
          icon: 'images/refresh.png',
          action: 'resetForm'
        }],
        resetForm: function() {
            this.items.each(function() {
              this.setValue();
            })
        }
      }]
      this.callParent(arguments);
    }
});
