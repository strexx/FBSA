// Import to load these template
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates !
import '../../ui/layouts/layout.js';
import '../../ui/pages/home.js';
import '../../ui/pages/storage.js';
import '../../ui/pages/edit.js';

// Define routes with FlowRouter !
FlowRouter.route('/', {
  name: 'FBSA.home',
  subscriptions: function() {
        this.register('markers', Meteor.subscribe('markers'));
    },
  action() {
    BlazeLayout.render('FBSA_layout', { main: 'home' });
  },
});

FlowRouter.route('/storage', {
  name: 'FBSA.storage',
  subscriptions: function() {
        this.register('storages', Meteor.subscribe('storages'));
        this.register('markers', Meteor.subscribe('markers'));
    },
  action() {
    BlazeLayout.render('FBSA_layout', { main: 'storage' });
  },
});

FlowRouter.route('/storage/:id', {
  name: 'FBSA.edit',
  subscriptions: function() {
        this.register('storages', Meteor.subscribe('storages'));
        this.register('markers', Meteor.subscribe('markers'));
    },
  action() {
    BlazeLayout.render('FBSA_layout', { main: 'edit' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('FBSA_layout', { main: 'FBSA_notFound' });
  },
};