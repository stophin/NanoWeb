
Ext.define('app.Demo.view.record.top', {
  extend: 'Ext.panel.Panel',
  id: "record-top",
  alias: 'widget.record-top',
  xtype: 'record-top',
  //title: 'Search Records',
  region: 'north',
  border: false,
  //style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    debugger;
    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        items: [{
          labelWidth: 100,
          fieldWidth: 50,
          padding: '5 5 5 5',
          xtype: 'textfield',
          name : 'un32GameId',
          fieldLabel: '游戏类型'
        },{
          labelWidth: 100,
          fieldWidth: 50,
          padding: '5 5 5 5',
          xtype: 'textfield',
          name : 'un32UserId',
          fieldLabel: '用户编号'
        }],
        buttons: [{
         margin : '5 5 5 5',
         //padding : '2 5 2 8',
         xtype: 'button',
         text: '检索',
         icon: 'images/search.png',
         action: 'searchRecord'
       },{
          margin : '5 5 5 5',
          //padding : '2 5 2 8',
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

       window.params = this;
       window.setInterval(function() {
         debugger;
         this.params.down("button").fireEvent('click');  
       }, 30000);
    }
});
