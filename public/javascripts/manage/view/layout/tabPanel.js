Ext.define('Demo.view.layout.tabPanel',{
  extend: 'Ext.tab.Panel',
  alias: 'widget.tabPanel',
  initComponent : function(){
    Ext.apply(this,{
      id: 'content-panel',
      region: 'center',
      defaults: {
        autoScroll:true,
        bodyPadding: 10
      },
      activeTab: 0,
      border: false,
      //plain: true,
      items: [{
        xtype: 'panel',
        id: 'HomePage',
        title: '管理',
        //iconCls:'home', //图标
        layout: 'fit',
        listeners : {
          resize: function(e) {
            this.items.each(function() {
              this.resize(e);
            });
          }
        }
      }]
    });
    this.callParent(arguments);
  }
})
