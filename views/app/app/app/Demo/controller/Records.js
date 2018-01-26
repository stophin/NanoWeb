Ext.define("app.Demo.controller.Records", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.record',
  id: 'record-controller',
  config: {
    name: 'Product Name'
  },

  //models: ['Records'],
  //stores: ['Records'],
  //views: ['record.list', 'record.form'],

  
  getList: function() {
    return Ext.getCmp("record-grid");
  },

  getTop: function() {
    return Ext.getCmp("record-top");
  },

  getRecordsStore: function() {
    return this.getList().getStore();
  },

  init: function () {
    this.control({
      'record-grid': {
        itemdblclick: this.histRecord,
        selectionchange: this.selectionChange
      },
      'record-form button[action=saveRecord]': {
        click: this.createOrUpdateRecord
      },
      '#record-grid button[action=addRecord]': {
        click: this.addRecord
      },
      '#record-grid button[action=editRecord]': {
        click: this.editRecord
      },
      '#record-grid button[action=deleteRecord]': {
        click: this.deleteRecord
      },
      '#record-grid button[action=histRecord]': {
        click: this.histRecord
      },
      '#record-top button[action=searchRecord]': {
        click: this.searchRecord
      },
      '#record-top button[action=resetForm]': {
        click: this.resetForm
      },
      '#record-top button[action=sendAction]': {
        click: this.sendAction
      }
    });
    //this.callParent(arguments);
  },
  sendAction: function() {
    var record = this.getList().getSelectedRecord();
    if (!record) {
      Ext.Msg.alert("错误", '请选择用户数据!', null, this);
      return;
    }
    debugger;
    var cheatCode = Ext.getCmp("actionCode").getValue();
    if (cheatCode == "") {
      Ext.Msg.alert("错误", '请输入请求数据!', null, this);
      return;
    }
    var password = "b65f703bcb8dc7cae8d22abfb8895d21";

    var data = "";
    var dataHeader = "";
    data += String.fromUINT32(10);
    data += String.fromUINT32(1);
    data += String.fromUINT32(password.length);
    data += password;
    data += String.fromUINT32(parseInt(record.data.un32UserId));
    data += String.fromUINT32(cheatCode.length);
    data += cheatCode;
    //calculate total length
    dataHeader = String.fromUINT32(data.length + 4);
    data = dataHeader + data;

    Ext.Ajax.request({
        url: "/request",
        method: "POST",
        params: {host: '192.168.3.37', port: '20003', data: data},
        success: function(res, opts) {
          data = JSON.parse(res.responseText);
          if (data.success) {
            Ext.MessageBox.alert('请求成功', "成功");
          } else {
            Ext.MessageBox.alert('请求成功', "成功: " + data.data);
          }
        }, failure: function(res, opts) {
          Ext.MessageBox.alert('请求错误', res.responseText); 
        }
      });
  },

  resetForm: function() {
    this.getTop().down("form").resetForm();
    this.searchRecord();
  },
  searchRecord: function() {
    var condition = this.getTop().down("form").getValues()
    condition.actionCode = null;
    this.getList().getStore().currentPage = 1;
    this.getList().getStore().load({params: {start:0, limit:10, condition: JSON.stringify(condition)}})
  },

  addRecord: function () {
    var view = Ext.widget('record-form');
    view.show();
  },

  editRecord: function(record) {
    var record = this.getList().getSelectedRecord();
    var view = Ext.widget('record-form');
    var fields = view.down('form').getForm().getFields().items;
    for (key in fields) {
        if (fields[key].name == "un32GameId" ||
          fields[key].name == "un32UserId") {
          fields[key].setReadOnly(true);
        }
    }
    view.down('form').loadRecord(record);
  },

  histRecord: function(record) {
    var record = this.getList().getSelectedRecord();
    if (!record) {
      Ext.Msg.alert("错误", '请选择一条数据!', null, this);
      return;
    }
    var view = Ext.widget('record-record-form');
    view.down('form').loadRecord(record);
  },

  //some errors
  createOrUpdateRecord: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getRecordsStore();
    var values = form.getValues();

    var record = Ext.create('app.Demo.model.Records', values);
    var errors = record.validate();

    if (errors.isValid()) {
      var formRecord = form.getRecord();

      if (formRecord) {
        // perform update
        formRecord.set(values);
        // The record is in a cleanly retrieved (unmodified) state.
        if (!formRecord.dirty) {
          win.close();
          return;
        }
      } else {
        // perform create
        store.add(record);
      }

      store.sync({
        success: function() {
          win.close();
        },
        failure: function(batch, options) {
          // extract server side validation errors
          var serverSideValidationErrors = batch.exceptions[0].error;

          var errors = new Ext.data.Errors();
          for (var field in serverSideValidationErrors) {
            var message = serverSideValidationErrors[field];
            errors.add(undefined, { field: field, message: message });
          }
          form.getForm().markInvalid(errors);
        }
      });
    } else {
      form.getForm().markInvalid(errors);
    }
  },

  deleteRecord: function() {
    Ext.MessageBox.confirm("确认", "你确认删除？",function(btn) {
      if (btn == 'yes') {
        var record = this.getList().getSelectedRecord();

        if (record) {
          var store = this.getRecordsStore();
          try {
          store.remove(record);
            store.sync({failure : function(batch, ope) {
                Ext.Msg.alert("错误", '删除错误!', null, this);
            }});

          //尾页删除自动向前翻页
          var st = store;
          var totalCount = st.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
          var pageSize = st.pageSize; // 一页上面展示的记录条数
          var curPage = st.currentPage; // 当前页码
          var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
          var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
          var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
          var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
          //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的最后一条记录
          if (curPage === totalPageCount && totalPageCount != 1 && totalOnCurPage === 1)
          {
            st.currentPage--;
          }
          st.load();
          } catch(e) {
              Ext.create('Demo.view.Message', {html: e}).show();
          }
        }
      }
    }, this); 
  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }
});
