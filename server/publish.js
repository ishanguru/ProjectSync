/**
 * Created by ishanguru on 12/18/16.
 */

import { CurrentUsers } from '../collections/users.js'
import { Events } from '../collections/events.js'
import { Messages } from '../collections/messages.js'

Meteor.publish('users', function () {
    return CurrentUsers.find({});
});

Meteor.publish('events', function () {
    return Events.find({});
});

Meteor.publish('messages', function () {
    return Messages.find({});
});