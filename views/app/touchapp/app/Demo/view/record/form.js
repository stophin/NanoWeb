Ext.define('app.Demo.view.record.form', {
  extend: 'Ext.window.Window',
  id: 'record-form',
  alias : 'widget.record-form',
  title : '添加/编辑',
  resizable: true,
  maximizable: true,
  border: false,
  layout: 'fit',
  autoShow: true,
  width: '80%',
  
  controller: 'record',

  initComponent: function() {
    Ext.getBody().mask();    
    this.items = [{
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
        fieldLabel: '游戏类型'
      }, {
        name : 'un32UserId',
        fieldLabel: '用户编号'
      }, {
        name : 'dGold',
        fieldLabel: '金币变化'
      }]
    }];

    this.buttons = [{
      margin : '5 5 5 5',
      //padding : '2 5 2 8',
      text: 'Save',
      icon: 'images/save.png',
      action: 'saveRecord'
    }, {
      margin : '5 5 5 5',
      //padding : '2 5 2 8',
      text: 'Cancel',
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
