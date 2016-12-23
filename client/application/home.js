/**
 * Created by ishanguru on 11/21/16.
 */

import { Events } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';


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
        return users.includes(Meteor.userId());
    },

    usersFunction : function (users) {
        console.log(users.length);
        var whosgoing = "Who's going? ";
        if (users.length > 1) {
            for (var i = 0; i < users.length; i++) {
                console.log(users[i]);
                if (users[i] != "temp") {
                    var host = (CurrentUsers.find({userId: users[i]}).fetch())[0].name;
                    console.log(host);
                    if (host != null) {
                        whosgoing = whosgoing + host + " ";
                    }
                }
            }
            console.log(whosgoing);
        }
        return whosgoing;
    },

    totalUsers : function (users) {
        console.log(users.length);
        if (users.length > 1) {
            for (var i = 0; i < users.length; i++) {
                console.log(users[i]);
                if (users[i] != "temp") {
                    return users.length-1;
                }
            }
        }
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