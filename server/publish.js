/**
 * Created by ishanguru on 12/18/16.
 */

import { Users } from '../collections/collections.js'
import { Events } from '../collections/collections.js'
import { Messages } from '../collections/collections.js'

Meteor.publish('users', function () {
    return Users.find({});
});

Meteor.publish('events', function () {
    return Events.find({});
});

Meteor.publish('messages', function () {
    return Messages.find({});
});