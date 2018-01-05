Ext.define('app.Demo.model.Records', {
  extend: 'Ext.data.Model',
  alias: 'model.records',
  idProperty: 'id',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'un32GameId', type: 'string' },
    { name: 'un32UserId', type: 'string' },
    { name: 'szUserName', type: 'string' },
    { name: 'szNickName', type: 'string' },
    { name: 'dGold', type: 'string' },
    { name: 'dCurGold', type: 'string'},
    { name: 'dGoldLast', type: 'string'},
    { name: 'dGoldHist', type: 'string'}
  ],
  validations: [
    { type: 'presence', field: 'un32GameId' },
    { type: 'presence', field: 'un32UserId' },
    { type: 'presence', field: 'dGold' }
  ]
});
