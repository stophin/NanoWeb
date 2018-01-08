Ext.define('touchapp.Grid.view.Grid', {
    extend : 'Ext.ux.touch.grid.List',
    xtype  : 'grid-grid',

    requires : [
        'Ext.ux.touch.grid.feature.Feature',
        'Ext.ux.touch.grid.feature.Editable',
        'Ext.ux.touch.grid.feature.Sorter',
        'Ext.field.Number',
        'touchapp.Grid.store.Grid'
    ],

    config : {
        title    : 'Grid',
        iconCls  : 'list',
        store    : true,
        columns  : [
            {
                header    : 'Text',
                dataIndex : 'text',
                width     : '90%',
                editor    : {
                    xtype  : 'textfield'
                }
            },
            {
                header    : 'Amount',
                dataIndex : 'amount',
                width     : '10%',
                editor    : {
                    xtype  : 'numberfield'
                }
            }
        ],
        features : [
            {
                ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                launchFn : 'initialize'
            },
            {
                ftype    : 'Ext.ux.touch.grid.feature.Editable',
                launchFn : 'initialize'
            }
        ]
    },

    applyStore : function() {
        return new touchapp.Grid.store.Grid();
    }
});