
Ext.define('Demo.view.json.top', {
  extend: 'Ext.panel.Panel',
  id: "json-top",
  alias: 'widget.json-top',
  //title: 'Search Jsons',
  region: 'north',
  border: false,
  style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    debugger;
    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        items: [{
          labelWidth: 50,
          fieldWidth: 50,
          padding: '5 5 5 5',
          xtype: 'textfield',
          name : 'name',
          fieldLabel: '测试'
        }],
        buttons: [{
          margin : '5 5 5 5',
          padding : '2 5 2 8',
          xtype: 'button',
          text: '测试按钮',
          icon: 'images/Import.png',
          action: 'importJson'
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
