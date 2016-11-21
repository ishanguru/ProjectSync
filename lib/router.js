/**
 * Created by ishanguru on 11/21/16.
 */

Router.configure({
    layoutTemplate: 'navigationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    landingTemplate: 'home'
});

var requireLogin = function() {
    if (Meteor.user()) {
        this.next();
    } else {
        if (Meteor.loggingIn()) {
            this.render('loading');
        }
        this.render('notLoggedIn');
    }
};



//hooks
Router.onBeforeAction(requireLogin, {only: 'home'});

Router.route('/', {
    name: 'home'
});