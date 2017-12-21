Ext.define('Demo.store.Users', {
  extend: 'Ext.data.Store',

  model: 'Demo.model.Users',
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
    url: '/users',
    model: 'Demo.model.Users',
    noCache: false,
    reader: {
      type: 'json',
      root: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
