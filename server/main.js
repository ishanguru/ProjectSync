import { Meteor } from 'meteor/meteor';

import { Events } from '../collections/events.js'
import { Messages } from '../collections/messages.js'
import { CurrentUsers } from '../collections/users.js'

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
        store: function (category, description, name, host, location) {
            console.log("!@#$%^&*()");
            Events.insert({'category': category, 'name': name, 'description': description, 'eventDate': new Date, 'location': location, 'host': host, 'users': ["temp"]});
        },
        profile_update: function (curr_id, name, bio) {
            console.log("in profile update");
            console.log(curr_id);
            console.log(CurrentUsers.find({userId: curr_id}).fetch());
            CurrentUsers.update({userId: curr_id}, { $set: {name: name, bio: bio}}, {multi: true});
            console.log("after");
            console.log(CurrentUsers.find({userId: curr_id}).fetch());
        },
        add_curr_user: function (curr_id) {
            console.log("in add_curr_user");
            var curr = CurrentUsers.find({userId: curr_id}).fetch().length;
            console.log("curr length: " + curr);
            if ( curr === 0) {
                CurrentUsers.insert({
                    'name': "undefined",
                    'bio': "undefined",
                    'userId': curr_id,
                    'events': [],
                    'recommendations': [],
                    'messages': []
                });
            }
        },
        check_profile_info : function(curr_id) {
            console.log("in check user profile Info");
            var curr_user = (CurrentUsers.find({userId: curr_id}).fetch())[0];
            console.log(curr_user.name);
            console.log(curr_user.bio);
            var curr_name = curr_user.name;
            var curr_bio = curr_user.bio;
            var json;
            if (curr_name !== "undefined" && curr_bio !== "undefined") {
                console.log("in main, updating look");
                json = [true, curr_name, curr_bio];
            }
            else {
                console.log("no name and bio");
                json = [false];
            }
            return json;
        },

        joinEvents: function (userId, eventId) {
            var updatedRecords = Events.update(
                { eventId: eventId},
                { $push: {users: userId}}
            );
            console.log(updatedRecords);
            return updatedRecords
        }
    })
});
