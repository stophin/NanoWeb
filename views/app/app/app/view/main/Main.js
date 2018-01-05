/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'app.view.main.MainController',
        'app.view.main.MainModel',
        'app.view.main.List',
        
        'app.Demo.controller.Users',
        'app.Demo.view.user.list',
        'app.Demo.view.user.top',
        'app.Demo.view.user.grid',
        'app.Demo.view.user.form',

        'app.Demo.controller.Records',
        'app.Demo.view.record.list',
        'app.Demo.view.record.top',
        'app.Demo.view.record.grid',
        'app.Demo.view.record.form'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        iconCls: 'fa-th-list',
        title: {
            bind: {
                //text: '应用'
            },
            width: 20,
            flex: 0
        }
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center'
                }
            }
        }
    },

    items: [{
        title: '主页',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: '用户',
        iconCls: 'fa-user',
        items: [{
            xtype: 'user-list'
        }]
    },  {
        title: '记录',
        iconCls: 'fa-asterisk',
        items: [{
            xtype: 'record-list'
        }]
    }, {
        title: '组别',
        iconCls: 'fa-users',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: '设置',
        iconCls: 'fa-cog',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
