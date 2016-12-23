/**
 * Created by su jiaxin on 12/23/16.
 */

import { Events } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';

have_event = false;

Template.eventsPage.onCreated(function() {

});

Template.eventsPage.helpers({
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

Template.eventsPage.events({

});



















