import Ember from 'ember';
import layout from '../templates/components/ember-sortable-table';

/**
 * Docs: http://tablesorter.com/docs/
 */

export default Ember.Component.extend({
  layout: layout,
  
  tagName: "table",
  
  classNames: ["ember-sortable-table"],
  
  rowTracker: Ember.computed({
    get(key) {
      return this.get(key);
    },
    set(key, val) {
      if(this.get('debug')) {
        Ember.Logger.log(
          "%c%s#rowTracker.set() triggering table update.",
          "color: purple", // http://www.w3schools.com/html/html_colornames.asp
          this.toString()
        );
      }
      
      this.send('updateTable');
      
      return val;
    }
  }),
  
  //////////////////////////////////
  //!          Settings           //
  //////////////////////////////////
  
  
  // Boolean
  // Indicates if tablesorter should disable selection of text in the table header (TH). Makes header behave more like a button.
  cancelSelection: true,
  
  // String
  // The CSS style used to style the header when sorting ascending.
  cssAsc: "headerSortUp",
  
  // String
  // The CSS style used to style the header when sorting descending.
  cssDesc: "headerSortDown",
  
  // String
  // The CSS style used to style the header in its unsorted state.
  cssHeader: "header",
  
  // Boolean
  // Boolean flag indicating if tablesorter should display debuging information usefull for development.
  debug: false,
  
  // Object
  // An object of instructions for per-column controls in the format: headers: `{ 0: { option: setting }, ... }` For example, to disable sorting on the first two columns of a table: headers: `{ 0: { sorter: false}, 1: {sorter: false} }`.
  headers: null,
  
  // Array
  // Use to add an additional forced sort that will be appended to the dynamic selections by the user. For example, can be used to sort people alphabetically after some other user-selected sort that results in rows with the same value like dates or money due. It can help prevent data from appearing as though it has a random secondary sort.
  sortForce: null,
  
  // Array
  // An array of instructions for per-column sorting and direction in the format: `[[columnIndex, sortDirection], ... ]` where columnIndex is a zero-based index for your columns left-to-right and sortDirection is 0 for Ascending and 1 for Descending. A valid argument that sorts ascending first by column 1 and then column 2 looks like: `[[0,0],[1,0]]`.
  sortList: null,
  
  // String
  // The key used to select more than one column for multi-column sorting. Defaults to the shift key. Other options might be ctrlKey, altKey. Reference: http://developer.mozilla.org/en/docs/DOM:event#Properties
  sortMultiSortKey: "shiftKey",
  
  // String or Function
  // Defines which method is used to extract data from a table cell for sorting. Built-in options include "simple" and "complex". Use complex if you have data marked up inside of a table cell like: `<td><strong><em>123 Main Street</em></strong></td>`. Complex can be slow in large tables so consider writing your own text extraction function "myTextExtraction" which you define
  textExtraction: "simple",
  
  // Boolean
  // Indicates if tablesorter should apply fixed widths to the table columns. This is useful for the Pager companion. Requires the jQuery dimension plugin to work.
  widthFixed: false,
  
  didInsertElement: function(){
    const settings = this.getProperties([
      "cancelSelection",
      "cssAsc",
      "cssDesc",
      "cssHeader",
      "debug",
      "sortMultiSortKey",
      "textExtraction",
      "widthFixed",
    ]);
    
    // Special handling for the `textExtraction` callback.
    if(this.attrs.textExtraction) {
      settings.textExtraction = (node) => {
        return this.attrs.textExtraction(node);
      };
    }
    
    const notNullSettings = ["headers", "sortForce", "sortList"];
    notNullSettings.forEach((key) => {
      if(this.get(key)) {
        settings[key] = this.get(key);
      }
    });
    
    if(this.get('debug')) {
      Ember.Logger.log(
        "%c%s#didInsertElement()\n\t settings: %O",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        this.toString(),
        settings
      );
    }
    
    this.$().tablesorter(settings);
  },
  
  willDestroyElement: function(){
    this.$().tablesorter('destroy');
  },
  
  actions: {
    updateTable() {
      // let the plugin know that we made an update 
      this.$().trigger("update");
    }
  }
});
