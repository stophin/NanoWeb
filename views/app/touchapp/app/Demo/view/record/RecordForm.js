Ext.define('app.Demo.view.record.RecordForm', {
  extend: 'Ext.window.Window',
  id: 'record-record-form',
  alias : 'widget.record-record-form',
  title : '历史记录',
  resizable: true,
  maximizable: true,
  border: false,
  layout: 'fit',
  autoShow: true,
  width: '100%',
  height: '100%',
  
  controller: 'record',

  initComponent: function() {
   this.store = Ext.create("app.Demo.store.HistRecords");
   this.store.on("beforeload", function(store) {
    debugger;
        condition = {};
        condition.un32GameId = Ext.getCmp('un32GameId').getValue()
        condition.un32UserId = Ext.getCmp('un32UserId').getValue()
        store.proxy.extraParams = {condition: JSON.stringify(condition)};
    }).load();
    var grid = Ext.create('Ext.grid.Panel', {
        padding: '2 8 2 2',
        xtype: 'grid',
        store: this.store,
        bbar : [{
            xtype: 'pagingtoolbar',
            //pageSize: 10,
            store: this.store,
            displayInfo: true
          }],
        columns: [
         {
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
          },{
            header: '初始金币',
            dataIndex: 'dCurGold',
            /*renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
              debugger;
                var gold = parseInt(value) + parseInt(record.data["dGold"])
                return "" + gold;
            },*/
            flex: 1
          },  {
            header: '金币变化',
            dataIndex: 'dGold',
            flex: 1
          }, {
            header: '时间',
            dataIndex: 'tTime',
            renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
              debugger;
              if (!this.store.newDate) {
                this.store.newDate = new Date();
              }
              this.store.newDate.setTime(value);
              //value = this.store.newDate.toLocaleString();
              value = this.store.newDate.Format('yyyy-MM-dd hh:mm:ss')
              return value;
            },
            flex: 2
          }]
      });

    Ext.getBody().mask();    
    this.items = [grid, {
      xtype: 'form',
      bodyPadding: 8,
      width: '80%',
      fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 100
      },
      defaultType: 'textfield',
      items: [{
        xtype: 'hidden',
        name : 'id',
        fieldLabel: 'id'
      }, {
        name : 'un32GameId',
        id: 'un32GameId',
        fieldLabel: '游戏类型'
      }, {
        name : 'un32UserId',
        id: 'un32UserId',
        fieldLabel: '用户编号'
      }, {
        name : 'dGold',
        fieldLabel: '金币变化'
      }]
    }];

    this.buttons = [{
      margin : '5 5 5 5',
      //padding : '2 5 2 8',
      text: '关闭',
      scope: this,
      icon: 'images/close.png',
      handler: this.close
    }];

    this.callParent(arguments);
  },
  listeners:{
      close:function(){
        Ext.getBody().unmask();
      }
  }
});
