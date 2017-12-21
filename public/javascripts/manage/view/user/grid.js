Ext.define('Demo.view.user.grid', {
  extend: 'Ext.grid.Panel',
  id: "user-grid",
  alias: 'widget.user-grid',
  //title: 'All Users',
  store: 'Users',
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
    this.addUserButton = new Ext.Button({
      icon: 'images/add.ico',
      text: '添加',
      action: 'addUser'
    });

    this.editUserButton = new Ext.Button({
      icon: 'images/edit.ico',
      text: '编辑',
      action: 'editUser',
      disabled: true
    });

    this.deleteUserButton = new Ext.Button({
      icon: 'images/del.ico',
      text: '删除',
      action: 'deleteUser',
      disabled: true
    });

    this.tbar = ['->', this.addUserButton, this.editUserButton, this.deleteUserButton];

    this.paging = new Ext.PagingToolbar({
      //pageSize: 10,
      store: 'Users',
      displayInfo: true
    });

    this.bbar = [this.paging];
    this.callParent(arguments);
  },

  getSelectedUser: function() {
    return this.getSelectionModel().getSelection()[0];
  },

  enableRecordButtons: function() {
    this.editUserButton.enable();
    this.deleteUserButton.enable();
  },

  disableRecordButtons: function() {
    this.editUserButton.disable();
    this.deleteUserButton.disable();
  }
});
