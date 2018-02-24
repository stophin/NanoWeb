
Ext.define('app.Demo.view.admin.grid', {
  extend: 'Ext.panel.Panel',
  id: "admin-grid",
  alias: 'widget.admin-grid',
  xtype: 'admin-grid',
  //title: 'Search Admins',
  region: 'north',
  border: false,
  //style:'margin:-10px -10px 0px -10px',

  initComponent: function () {

    this.items = [{
        xtype: 'form',
        border: false,
        layout: 'column',
        /*items: [{
          xtype: 'textareafield',
          label: 'Bio',
          width: "100%",
          height: 200,
          readOnly: "true",
          maxRows: 4,
          name: 'bio',
          id: "Msg"
        }]*/
        html: "<div id='MsgContainer'><ul class='content'></ul></div>"
      }]
      this.callParent(arguments);
    }
});
