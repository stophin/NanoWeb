Ext.define('Demo.view.layout.menu',{
  extend: 'Ext.tree.TreePanel',
  alias: 'widget.menu',
  initComponent : function(){
    Ext.apply(this,{
      id: 'menu-panel',
      title: '系统菜单',
      //iconCls:'icon-menu', //图标
      margins : '0 0 -1 1',
      region:'west',
      border : false,
      enableDD : false,
      split: true,
      width : 120,
      minSize : 130,
      maxSize : 300,

      containerScroll : true,
      collapsible : true,
      autoScroll: false,
      rootVisible: true,

      root:{
        text:'一级目录',
        expanded:true,
        leaf:false,
        children:[
          //{ 
            //text:'Test',
            //leaf:false,
            //expanded:true,
            //children:[
              {id:'menu-list',text:'菜单目录',leaf:true}
            //] 
          //} 
        ]
      }
    });
    this.callParent(arguments);
  }
})

