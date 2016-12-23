/**
 * Created by ishanguru on 11/21/16.
 */

import { Events } from '../../collections/events.js';

Template.home.onCreated(function() {
    console.log(Meteor.user());
});

Template.home.helpers({

    joinEventFunction : function () {
        var allValues = Events.find({ host : {$ne: Meteor.userId()}}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    },

    userGoing : function (users) {
        console.log(users);
        return users.includes(Meteor.userId());
    }
});

Template.home.events({
    'click .joinevent': function (event) {
        console.log("Joined event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();
        
        Meteor.call("joinEvents", userId, eventId, function () {
            
        });
    },
    'click .leaveevent': function (event) {
        console.log("left event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();

        Meteor.call("leaveEvents", userId, eventId, function () {

        });
    }
});