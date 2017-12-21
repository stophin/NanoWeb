Ext.define('Demo.model.Users', {
  extend: 'Ext.data.Model',
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
