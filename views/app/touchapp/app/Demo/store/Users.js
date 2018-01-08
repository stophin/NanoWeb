Ext.define('touchapp.Demo.store.Users', {
  extend: 'Ext.data.Store',
  alias: 'store.user',
  xtype: 'user',

  requires: [
      'touchapp.Demo.model.Users'
  ],
  //model: 'touchapp.Demo.model.Users',
  //baseParams: {limit: 10},
  //autoLoad: true,

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
  config: {
    pageSize: 10,
    autoLoad: {params: {start:0, limit:10}},
    autoSync: false,
    proxy: {
      type: 'rest',
      url: '/users',
      model: 'touchapp.Demo.model.Users',
      noCache: false,
      reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'totalCount',
        successProperty: 'success'
      }
    }
  },

});
