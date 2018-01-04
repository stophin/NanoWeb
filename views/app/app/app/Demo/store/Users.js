Ext.define('app.Demo.store.Users', {
  extend: 'Ext.data.Store',
  alias: 'store.user',
  xtype: 'user',

  requires: [
      'app.Demo.model.Users'
  ],
  //model: 'app.Demo.model.Users',
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
    model: 'app.Demo.model.Users',
    noCache: false,
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
