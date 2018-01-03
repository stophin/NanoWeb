Ext.define('app.Demo.model.Users', {
  extend: 'Ext.data.Model',
  alias: 'model.users',
  idProperty: 'id',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'password', type: 'string' }
  ],
  validations: [
    { type: 'presence', field: 'name' },
    { type: 'presence', field: 'password' }
  ]
});
