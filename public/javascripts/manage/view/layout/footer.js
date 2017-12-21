Ext.define('Demo.view.layout.footer',{
  extend: 'Ext.Toolbar',
  initComponent : function(){
    var user = "";
    Ext.Ajax.request({
      url: '/getuser',
      async: false,
      success: function(data) {
        user = JSON.parse(data.responseText).data;
      }
    });
    Ext.apply(this,{
      id:"bottom",
      //frame:true,
      region:"south",
      height:23,
      items:["当前用户：" + user,'->',"技术支持:stophin"]
    });
    this.callParent(arguments);
  }
})

