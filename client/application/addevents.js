/**
 * Created by ishanguru on 12/18/16.
 */

import { Events } from '../../collections/events.js';

Template.eventsPage.helpers({
    
    hostingEvents : function () {
        var allValues = Events.find({host : Meteor.userId()}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    },

    goingEvents : function () {
        var allValues = Events.find({users : {$in: [Meteor.userId()]}}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    }
});

Template.eventsPage.events({
    'submit .eventsForm': function (event) {
        event.preventDefault();

        var target = event.target;

        var category = target.category.value;
        var location = target.location.value;
        var description = target.location.value;
        var date = target.date.value;
        console.log(date);
        var name = target.name.value;
        var host =  Meteor.userId();

        console.log(host);

        console.log(category);
        console.log(location);
        console.log(description);

        Meteor.call("store", category, description, name, host, location, date, function () {

        });

        console.log("inserted into db");
    }
});

Template.eventsPage.events({
    'click .cancelevent': function (event) {
        console.log("cancelled event");
        var target = event.target;

        var eventId = target.id;

        Meteor.call("cancelEvents", eventId, function () {

        });
        //get this event ID, update the record in user, by appending this event ID to their events array
    },

    'click .leaveevent': function (event) {
        console.log("left event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();

        Meteor.call("leaveEvents", userId, eventId, function () {

        });
        //get this event ID, update the record in user, by appending this event ID to their events array
    },

});
