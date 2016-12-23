/**
 * Created by ishanguru on 11/21/16.
 */

import { Events } from '../../collections/events.js';

Template.home.onCreated(function() {
    console.log(Meteor.user());
});

Template.home.helpers({

    joinEventFunction : function () {
        var allValues = Events.find({ users : {$ne: Meteor.userId()}}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    },

    checkIfGoing : function () {
        //check if the user is already going
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
        //get this event ID, update the record in user, by appending this event ID to their events array
    }
});