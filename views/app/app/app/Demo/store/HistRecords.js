Ext.define('app.Demo.store.HistRecords', {
  extend: 'Ext.data.Store',
  alias: 'store.histrecord',
  xtype: 'histrecord',

  requires: [
      'app.Demo.model.HistRecords'
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
    url: '/records/hist',
    model: 'app.Demo.model.HistRecords',
    noCache: false,
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
