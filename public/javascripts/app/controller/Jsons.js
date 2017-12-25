Ext.define("Demo.controller.Jsons", {
  extend: 'Ext.app.Controller',
  id: 'json-controller',
  config: {
    name: 'Product Name'
  },

  models: [],
  stores: [],
  views: ['json.list'],

  init: function () {
    debugger;
    this.control({
      '#json-top button[action=importJson]': {
        click: this.importJson
      }
    });
  },

  importJson: function() {
    debugger;
    alert("OK");
  }
});
