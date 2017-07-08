/* eslint-env node */
'use strict';

var funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-sortable-table',
  included: function(app) {
    this._super.included(app);

    // Import the correct JS
    app.import(app.bowerDirectory + '/tablesorter/jquery.tablesorter.js');
    
    app.import('vendor/styles/ember-sortable-table.css');
  },
  treeForPublic: function(treeName) {
    var tree;

    tree = funnel(this.app.bowerDirectory + '/tablesorter', {
      srcDir: 'themes/blue',
      include: ['*.gif'],
      destDir: '/assets'
    });

    return tree;
  }
};
