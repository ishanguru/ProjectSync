import { Meteor } from 'meteor/meteor';

import { Events } from '../collections/events.js'
import { Messages } from '../collections/messages.js'
import { CurrentUsers } from '../collections/events.js'

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
        store: function (category, description, name, host, location) {
            console.log("!@#$%^&*()");
            Events.insert({'category': category, 'name': name, 'description': description, 'eventDate': new Date, 'location': location, 'host': host, 'users': ["temp"]});
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
