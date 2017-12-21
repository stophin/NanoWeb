Ext.define("Demo.controller.Users", {
  extend: 'Ext.app.Controller',
  id: 'user-controller',
  config: {
    name: 'Product Name'
  },

  models: ['Users'],
  stores: ['Users'],
  views: ['user.list', 'user.form'],

  refs: [{
    ref: 'list',
    selector: 'user-grid'
  },{
    ref: 'top',
    selector: 'user-top'
  }],

  init: function () {
    this.control({
      'user-grid': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'user-form button[action=save]': {
        click: this.createOrUpdateUser
      },
      '#user-grid button[action=addUser]': {
        click: this.addUser
      },
      '#user-grid button[action=editUser]': {
        click: this.editUser
      },
      '#user-grid button[action=deleteUser]': {
        click: this.deleteUser
      },
      '#user-top button[action=searchUser]': {
        click: this.searchUser
      },
      '#user-top button[action=resetForm]': {
        click: this.resetForm
      },
      '#user-top button[action=importUser]': {
        click: this.importUser
      },
      '#user-top button[action=exportUser]': {
        click: this.exportUser
      }
    });
    //this.callParent(arguments);
  },

  importUser: function() {
    var grid = this.getList();
    var store = this.getUsersStore();
    Ext.getBody().mask();    
    var fp = Ext.create('Ext.form.Panel', {  
      fileUpload: true,  
      frame: false,   
      border: false,
      autoHeight: true,  
      bodyStyle: 'padding: 10px 10px 0 10px;',  
      labelWidth: 0,
      defaults: {  
          anchor: '95%',  
          allowBlank: false,  
          msgTarget: 'side'  
      },  
      items: [{  
            xtype: 'fileuploadfield',  
            id: 'form-file',  
            emptyText: '请选择文件',  
            fieldLabel: '',  
            name: 'filename',  
            buttonText: '...',  
            buttonCfg: {
                iconCls: 'upload-icon'  
            }  
      }], 
    });
    var reqWin = Ext.widget('window', {
        title: "上传文件",
        modal: false,
        width: '80%',
        height: 120,
        layout: 'fit',
        resizable: true,
        maximizable: true,
        items: fp,
        buttons: [{  
          text: '导入',  
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          icon: 'images/Import.png',
          handler: function() {  
              if (fp.getForm().isValid()) {  
                debugger;
                  fp.getForm().submit({  
                      url: '/users/importUser',//后台处理的页面  
                      waitMsg: '正在上传文件...',  
                      async: true,
                      success: function(fp, data) {  
                        debugger;
                       // Ext.MessageBox.alert('Success', "<div style='height:100px;overflow-y: scroll'>" + data.result.data + "</div>"); 
                        
                        Ext.Ajax.request({
                          url: "/users/batchUsers",
                          params: {filename: data.result.data},
                          success: function(res, opts) {
                            data = JSON.parse(res.responseText);
                            if (data.success) {
                              //Ext.MessageBox.alert('上传成功', "上传成功");
                              Ext.create('Demo.view.Message', {html: '上传成功!'}).show();
                              reqWin.close();
                              store.load();
                            } else {
                              Ext.MessageBox.alert('上传错误', data.data);
                            }
                          }, failure: function(res, opts) {
                            data = JSON.parse(res.responseText);
                            Ext.MessageBox.alert('上传错误', data.data); 
                          }
                        })
                      }, failure: function(fp, data) {
                         Ext.MessageBox.alert('上传错误', data.response.responseText); 
                      }
                  });  
              }  
          }  
      }, {  
          text: '清除',  
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          icon: 'images/Refresh.png',
          handler: function() {
              fp.getForm().reset();  
          }  
      },'->', '-', {
        text: "关闭",
        margin : '5 5 5 5',
        padding : '2 5 2 8',
        icon: 'images/close.png',
        handler : function(){
          reqWin.close();
        }
      }],
      listeners:{
          close:function(){
            Ext.getBody().unmask();
          }
      }
    }).show();
  },
  exportUser: function() {
    //获取数据
    debugger;
    var grid = this.getList();
    debugger;
    var condition = this.getTop().down("form").getValues()
    var content = [];
    //
    Ext.getBody().mask();
    var fp = Ext.create('Ext.form.Panel', {  
      fileUpload: true,  
      width: 500,  
      frame: false,   
      border: false,
      autoHeight: true,  
      bodyStyle: 'padding: 10px 10px 0 10px;',  
      labelWidth: 0,  
      defaults: {  
          anchor: '95%',  
          allowBlank: false,  
          msgTarget: 'side'  
      },
      items: [{  
            labelWidth: 50,
            fieldWidth: 50,
            xtype: 'textfield',  
            id: 'form-file',  
            emptyText: 'down.xlsx', 
            value: 'down.xlsx',  
            fieldLabel: '文件名',  
            name: 'filename'
      }]
    });
    var reqWin = Ext.widget('window', {
        title: "下载文件",
        modal: false,
        width: '80%',
        height: 120,
        layout: 'fit',
        resizable: true,
        maximizable: true,
        items: [fp],
        buttons: [{  
          text: '下载',  
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          icon: 'images/Export.png',
          handler: function() {
            if (fp.getForm().isValid()) {
              //跳板用form
              var form=$("<form>");//定义一个form表单
              form.attr("target","_blank");
              form.attr("style","display:none");
              form.attr("method","post");
              form.attr("action","/users/exportUser");
              var input1=$("<input>");
              input1.attr("type","hidden");
              input1.attr("name","data");
              var input2=$("<input>");
              input2.attr("type","hidden");
              input2.attr("name","filename");
              $("body").append(form);//将表单放置在web中
              form.append(input1);
              form.append(input2);
              input2.attr("value", fp.getValues().filename);
              input1.attr("value", JSON.stringify(content));
              form.submit();
              reqWin.close();
            }
          }  
      },'->', '-', {
        text: "关闭",
        margin : '5 5 5 5',
        padding : '2 5 2 8',
        icon: 'images/close.png',
        handler : function(){
          reqWin.close();
        }
      }],
      listeners:{
          close:function(){
            Ext.getBody().unmask();
          }
      }
    });
    var store = Ext.create("Demo.store.Users");
    store.proxy.extraParams = {start:0, limit:80, condition: JSON.stringify(condition)};
    store.load({
     callback: function(record, store, success) {
      if (success) {
        debugger;
        var data = [];
        for (key in record) {
          data.push(record[key].data);
        }
        //console.log(JSON.stringify(data));
        //构成数组，生成的Excel为[[A1, B1, C1,...],[A2, B2, C2,...],[...]]
        var index = 0;
        content[index] = [];
        for (key in data[0]) {
          for (_key in grid.columns) {
            if (grid.columns[_key].dataIndex == key) {
                //获取grid的header而不是store的key
                content[index].push(grid.columns[_key].text);
                break;
            }
          }
        }
        debugger;
        for (key in data) {
          var _data = data[key];
          index ++;
          content[index] = [];
          for (key in _data) {
            if (_data[key] instanceof Date) {
              content[index].push(_data[key].Format("yyyy-MM-dd"));
            } else {
              content[index].push(_data[key]);
            }
          }
        }
        reqWin.show();
      } else {
        Ext.MessageBox.alert('获取数据错误', JSON.stringify(record));
        reqWin.close();
      }
    }});
  },
  resetForm: function() {
    this.getTop().down("form").resetForm();
    this.searchUser();
  },
  searchUser: function() {
    debugger;
    var condition = this.getTop().down("form").getValues()
    this.getList().getStore().currentPage = 1;
    this.getList().getStore().load({params: {start:0, limit:10, condition: JSON.stringify(condition)}})
  },

  addUser: function () {
    var view = Ext.widget('user-form');
    view.show();
  },

  editUser: function(record) {
    var record = this.getList().getSelectedUser();
    var view = Ext.widget('user-form');
    view.down('form').loadRecord(record);
  },

  //some errors
  createOrUpdateUser: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getUsersStore();
    var values = form.getValues();

    var user = Ext.create('Demo.model.Users', values);
    var errors = user.validate();
    debugger;

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
        store.add(user);
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

  deleteUser: function() {
    Ext.MessageBox.confirm("确认", "你确认删除？",function(btn) {
      if (btn == 'yes') {
        var record = this.getList().getSelectedUser();

        if (record) {
          var store = this.getUsersStore();
          try {
          store.remove(record);
            store.sync({failure : function(batch, ope) {
              if (batch.proxy.reader.rawData.error == 1) {
                Ext.create('Demo.view.Message', {html: '请至少保留一个用户!'}).show();
              }
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
