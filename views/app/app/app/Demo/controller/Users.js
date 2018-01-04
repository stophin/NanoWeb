Ext.define("app.Demo.controller.Users", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.user',
  id: 'user-controller',
  config: {
    name: 'Product Name'
  },

  models: [],
  stores: [],
 // views: ['user.list'],
  getGridStore: function() {
    return Ext.getCmp("user-grid").getStore();
  },

  init: function () {
    debugger;
    this.control({
      '#user-top button[action=importUser]': {
        click: this.importUser
      },
      '#user-grid button[action=addUser]': {
        click: this.addUser
      },
      '#user-form button[action=saveUser]': {
        click: this.saveUser
      },
    });
  },

  importUser: function() {
    debugger;
    var grid = this.getStore();
  },

  addUser: function() {
    debugger;
    var store = this.getGridStore();
    var view = Ext.widget('user-form');
    view.show();
  },

  saveUser: function() {
    alert("save");
  }
});
