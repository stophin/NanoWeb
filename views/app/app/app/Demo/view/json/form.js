Ext.define('app.Demo.view.json.form', {
  extend: 'Ext.window.Window',
  id: 'json-form',
  alias : 'widget.json-form',
  title : '添加/编辑',
  resizable: true,
  maximizable: true,
  border: false,
  layout: 'fit',
  autoShow: true,
  width: '80%',

  initComponent: function() {
    Ext.getBody().mask();    
    this.items = [{
      xtype: 'form',
      bodyPadding: 8,
      width: '80%',
      fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 65
      },
      defaultType: 'textfield',
      items: [{
        xtype: 'hidden',
        name : 'id',
        fieldLabel: 'id'
      }, {
        name : 'name',
        fieldLabel: '名称'
      }, {
        name : 'password',
        fieldLabel: '密码'
      }]
    }];

    this.buttons = [{
      margin : '5 5 5 5',
      padding : '2 5 2 8',
      text: 'Save',
      icon: 'images/save.png',
      action: 'save'
    }, {
      margin : '5 5 5 5',
      padding : '2 5 2 8',
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
