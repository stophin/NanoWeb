Ext.define('app.Demo.view.record.grid', {
  extend: 'Ext.grid.Panel',
  id: "record-grid",
  alias: 'widget.record-grid',
  xtype: 'record-grid',
  //title: 'All Records',
  //store: 'Records',

  region: 'center',
  border: false,
  //style:'margin:0px -10px -10px -10px',

  initComponent: function () {
   this.store = Ext.create("app.Demo.store.Records");
   this.columns = [{
      header: 'id',
      dataIndex: 'id',
      width: 50
    },{
      header: '游戏类型',
      dataIndex: 'un32GameId',
      flex: 1
    }, {
      header: '用户编号',
      dataIndex: 'un32UserId',
      flex: 1
    }, {
      header: '用户名称',
      dataIndex: 'szUserName',
      flex: 1
    },{
      header: '用户昵称',
      dataIndex: 'szNickName',
      flex: 1
    }, {
      header: '金币变化',
      dataIndex: 'dGold',
      flex: 1
    }, {
      header: '最后一次',
      dataIndex: 'dGoldLast',
      flex: 1
    }, {
      header: '累计金币',
      dataIndex: 'dGoldHist',
      flex: 1
    }];
    //新建按钮
    this.addRecordButton = new Ext.Button({
      icon: 'images/add.ico',
      text: '添加',
      action: 'addRecord'
    });

    this.editRecordButton = new Ext.Button({
      icon: 'images/edit.ico',
      text: '编辑',
      action: 'editRecord',
      disabled: true
    });

    this.deleteRecordButton = new Ext.Button({
      icon: 'images/del.ico',
      text: '删除',
      action: 'deleteRecord',
      disabled: true
    });

    this.tbar = ['->', this.addRecordButton, this.editRecordButton, this.deleteRecordButton];

    this.paging = new Ext.PagingToolbar({
      //pageSize: 10,
      store: this.store,
      displayInfo: true
    });

    this.bbar = [this.paging];
    this.callParent(arguments);
  },

  getSelectedRecord: function() {
    return this.getSelectionModel().getSelection()[0];
  },

  enableRecordButtons: function() {
    this.editRecordButton.enable();
    this.deleteRecordButton.enable();
  },

  disableRecordButtons: function() {
    this.editRecordButton.disable();
    this.deleteRecordButton.disable();
  }
});
