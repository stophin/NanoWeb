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

  init: function () {
    debugger;
    this.control({
      '#user-top button[action=importUser]': {
        click: this.importUser
      },
      '#user-grid button[action=addUser]': {
        click: this.addUser
      },
    });
  },

  importUser: function() {
    debugger;
    var grid = this.getStore();
    alert("OK");
  },

  addUser: function() {
    debugger;
    alert("add");
    var grid = this.getStore();
    var view = Ext.widget('user-form');
    view.show();
  }
});
