Ext.define('Demo.view.json.grid', {
  extend: 'Ext.grid.Panel',
  id: "json-grid",
  alias: 'widget.json-grid',
  //title: 'All Jsons',
  //store: 'Jsons',
  region: 'center',
  border: false,
  style:'margin:0px -10px -10px -10px',

  initComponent: function () {
   this.columns = [{
      header: 'id',
      dataIndex: 'id',
      flex: 1
    }, {
      header: '名称',
      dataIndex: 'name',
      flex: 1
    }, {
      header: '密码',
      dataIndex: 'password',
      flex: 1
    }];
    //新建按钮
    this.addJsonButton = new Ext.Button({
      icon: 'images/add.ico',
      text: '添加',
      action: 'addJson'
    });

    this.editJsonButton = new Ext.Button({
      icon: 'images/edit.ico',
      text: '编辑',
      action: 'editJson',
      disabled: true
    });

    this.deleteJsonButton = new Ext.Button({
      icon: 'images/del.ico',
      text: '删除',
      action: 'deleteJson',
      disabled: true
    });

    this.tbar = ['->', this.addJsonButton, this.editJsonButton, this.deleteJsonButton];

    this.paging = new Ext.PagingToolbar({
      //pageSize: 10,
      //store: 'Jsons',
      displayInfo: true
    });

    this.bbar = [this.paging];
    this.callParent(arguments);
  },

  getSelectedJson: function() {
    return this.getSelectionModel().getSelection()[0];
  },

  enableRecordButtons: function() {
    this.editJsonButton.enable();
    this.deleteJsonButton.enable();
  },

  disableRecordButtons: function() {
    this.editJsonButton.disable();
    this.deleteJsonButton.disable();
  }
});
