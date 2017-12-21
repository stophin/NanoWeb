
Ext.define('Demo.view.layout.header', {
  extend: 'Ext.Panel',
  border: false,
  initComponent: function() {
    var user = "";
    Ext.Ajax.request({
      url: '/getuser',
      async: false,
      success: function(data) {
        user = JSON.parse(data.responseText).data;

      }
    });
    Ext.applyIf(this, {
      xtype: 'panel',
      border: false,
      cls: 'header',
      region: 'north',
      layout: 'border',
      //html: '<div style="background-color: #DFE8F6; border:none"><br><center><font size = 6>123</font></center></div>',
      items: [{
        xtype: 'component',
        border: false,
        region: 'center',
        html: '<br><center><font size = 6>系统</font></center>',
      }, {
        xtype: 'panel',
        border: false,
        region: 'east',
        width: 80,
        bodyStyle: 'background: transparent',
        items: [
            {  
                xtype: 'box', //或者xtype: 'component',  
                width: 70, //图片宽度  
                height: 70, //图片高度  
                autoEl: {  
                    tag: 'img',    //指定为img标签  
                    src: 'images/avatar.jpg'    //指定url路径  
                }
            },
            {
                xtype: "button",
                id: 'user-btn',
                text: user,
                ui : 'normal', 
                menu: [ 
                   { 
                    text: "应用", icon: "images/app.png", iconCls: 'qicon', listeners: {
                      click: function() {
                        window.location.href = '/';
                      }
                    }
                  }, '-',
                   { 
                    text: "退出", icon: "images/close.png", iconCls: "qicon", listeners: {
                      click: function() {
                        Ext.Ajax.request({
                          url: '/logout',
                          success: function(data) {
                             window.location.href = "/";
                          }
                        });
                      }
                    }
                  }
                ]
            }
        ]
      }
      ],
      height: 90
    });
    this.callParent(arguments);
  }
});