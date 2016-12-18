/**
 * Created by ishanguru on 12/17/16.
 */

Users = new Mongo.Collection('users');
Events = new Mongo.Collection('events');
Messages = new Mongo.Collection('messages');

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
        },
        autoform: {
            type: "hidden"
        }
    },

    events: {
        type: Array[EventSchema],
        label: "Events"
    },

    recommendations: {
        type: Array[EventSchema],
        label: "Recommendations"
    }

});

Events.attachSchema(EventSchema);
Users.attachSchema(UsersSchema);
Messages.attachSchema(MessageSchema);
