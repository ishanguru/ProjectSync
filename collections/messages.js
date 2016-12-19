/**
 * Created by ishanguru on 12/18/16.
 */
import { Mongo } from 'meteor/mongo'

import { UsersSchema } from './users.js'

export const Messages = new Mongo.Collection('messages');

MessageSchema = new SimpleSchema({

    to: {
        type: Array[UsersSchema]
    },

    from: {
        type: [UsersSchema]
    },

    message: {
        type: String,
        label: "Message"
    }

});

Messages.attachSchema(MessageSchema);

if (Meteor.isServer) {
    Meteor.publish('messages', function() {
        return Messages.find({});
    });
} else if (Meteor.isClient) {
    Meteor.subscribe('messages');
}

