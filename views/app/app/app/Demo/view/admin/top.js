
Ext.define('app.Demo.view.admin.top', {
  extend: 'Ext.panel.Panel',
  id: "admin-top",
  alias: 'widget.admin-top',
  xtype: 'admin-top',
  //title: 'Search Admins',
  region: 'north',
  border: false,
  //style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        items: [{
          labelWidth: 0,
          fieldWidth: 50,
          padding: '5 5 5 5',
          width: "98%",
          xtype: 'textfield',
          id: 'actionString',
          name: 'actionString',
          listeners: {
            specialkey : function(field, e) {  
                    if (e.getKey() == Ext.EventObject.ENTER) {  
                      var cgr = "cgr_l";
                      try {
                        cgr = field.up("form").getValues().cgr;
                      } catch(e) {
                      }
                      if (cgr == "cgr_l") {
                        Ext.getCmp("sendActionCGR_L").fireEvent("click");
                      } else {
                        Ext.getCmp("sendActionCGR_R").fireEvent("click");
                      }
                      //清空
                      field.setValue();
                    }  
                }  
          }
        },{
            xtype: 'radiogroup',
            fieldLabel: '选择发送到',
            // Arrange radio buttons into two columns, distributed vertically
            columns: 2,
            items: [
                { boxLabel: '本地CGR  ', name: 'cgr', inputValue: 'cgr_l', checked: true },
                { boxLabel: '远程CGR  ', name: 'cgr', inputValue: 'cgr_r'}
            ]
        },{
         margin : '5 5 5 5',
         padding : '2 5 2 8',
         xtype: 'button',
         text: '清空消息',
         action: 'clearLogMsg'
       },{
          labelWidth: 60,
          fieldWidth: 150,
          //margin: '5 5 5 5',
          padding : '2 5 2 8',
          width: 150,
          blankText: '请填写缓冲大小',
          allowBlank: false,
          regex: /^\d+$/,
          maxLength: 4,
          regexText: '请输入数字',
          xtype: 'textfield',
          id: 'BufferSize',
          fieldLabel: '缓冲大小'
        }],
        buttons: [{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '登录GM',
         icon: 'images/send.png',
         action: 'sendLogin'
       }, {
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: 'MSN启用',
         icon: 'images/send.png',
         action: 'sendActionMSN'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: 'GS启用',
         icon: 'images/send.png',
         action: 'sendActionGS'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '加载config',
         icon: 'images/send.png',
         action: 'sendActionCF'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '退出用户',
         icon: 'images/send.png',
         action: 'sendActionUS'
       }, '->',{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '本地CGR',
         icon: 'images/send.png',
         action: 'sendActionCGR_L',
         id: 'sendActionCGR_L'
       },{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '远程CGR',
         icon: 'images/send.png',
         action: 'sendActionCGR_R',
         id: 'sendActionCGR_R'
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
