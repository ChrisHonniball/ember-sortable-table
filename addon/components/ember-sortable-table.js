import Ember from 'ember';
import layout from '../templates/components/ember-sortable-table';

export default Ember.Component.extend({
  layout: layout,
  
  tagName: "table",
  
  classNames: ["ember-sortable-table"],
  
  ////////////////
  //! Variables //
  ////////////////
  
  ///////////////
  //! Computed //
  ///////////////
  
  
  
  /////////////
  //! Events //
  /////////////
  
  didInsertElement: function(){
    var that = this;
    that.$().tablesorter();
  },
  
  willDestroyElement: function(){
    var that = this;
    that.$().tablesorter('destroy');
  }

});
