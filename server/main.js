import { Meteor } from 'meteor/meteor';

import { Events } from '../collections/events.js'
import { Messages } from '../collections/messages.js'
import { CurrentUsers } from '../collections/events.js'

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
        store: function () {
            console.log("!@#$%^&*()");
            Events.insert({'category': "category", 'name': "Ishan", 'description': "cool", 'eventDate': new Date, 'location': "png", 'host': "user", 'users': "temp"});
        },
        getCurrentMessages: function(){
        	console.log("jmklmklmlmklmklm")
        	return Messages.find({to: Meteor.userId()}).fetch();
        }, 
        test: function(){
        	console.log("I CAN MAKE CALLS BITCH")
        }
    })
});
