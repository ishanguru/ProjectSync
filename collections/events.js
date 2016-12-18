/**
 * Created by ishanguru on 12/18/16.
 */
import { UsersSchema } from './users.js'

export const Events = new Mongo.Collection('events');

EventSchema = new SimpleSchema({

    category: {
        type: String,
        label: "Category"
    },

    name: {
        type: String,
        label: "Name"
    },

    description: {
        type: String,
        label: "Description"
    },

    location: {
        type: String,
        label: "Location"
    },

    eventDate: {
        type: Date,
        label: "Event Date"
    },

    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function (){
            return new Date()
        }
    },

    host: {
        type: UsersSchema,
        label: "Host"
    },

    users: {
        type: Array[UsersSchema],
        label: "People going"
    }

});

Events.attachSchema(EventSchema);
