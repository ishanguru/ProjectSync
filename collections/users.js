/**
 * Created by ishanguru on 12/17/16.
 */
import { Mongo } from 'meteor/mongo'
import { EventSchema } from './events.js'
import { MessageSchema } from './messages.js'


export const CurrentUsers = new Mongo.Collection('current_users');

UsersSchema = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    },

    userId: {
        type: String,
        label: "UserId",
        autoValue: function()
        {
            if (this.isInsert) {
                return this.userId
            }
        }
    },

    events: {
        type: Array[EventSchema],
        label: "Events"
    },

    recommendations: {
        type: Array[EventSchema],
        label: "Recommendations"
    },

    messages: {
        type: Array[MessageSchema]
    }

});

CurrentUsers.attachSchema(UsersSchema);
