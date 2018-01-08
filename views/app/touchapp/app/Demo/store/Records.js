Ext.define('app.Demo.store.Records', {
  extend: 'Ext.data.Store',
  alias: 'store.record',
  xtype: 'record',

  requires: [
      'app.Demo.model.Records'
  ],
  //model: 'app.Demo.model.Records',
  pageSize: 10,
  //baseParams: {limit: 10},
  autoLoad: {params: {start:0, limit:10}},
  //autoLoad: true,
  autoSync: false,

  //listeners: {
    //load: function() {
      //console.log(arguments);
    //},
    //update: function() {
      //console.log(arguments);
    //},
    //beforesync: function() {
      //console.log(arguments);
    //}
  //},

  proxy: {
    type: 'rest',
    url: '/records',
    model: 'app.Demo.model.Records',
    noCache: false,
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
