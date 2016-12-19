/**
 * Created by ishanguru on 12/18/16.
 */

import { Events } from '../../collections/events.js';

Template.addEvents.helpers({

    tempfunc : function () {
        var allValues = Events.findOne({});
        console.log(allValues);
       // return allValues;
    }

});

Template.addEvents.events({
    'submit .eventsForm': function (event) {
        event.preventDefault();

        var target = event.target;

        var category = target.category.value;
        var location = target.location.value;
        var description = target.location.value;
        var date = new Date();

        console.log(category);
        console.log(location);
        console.log(description);

        Meteor.call("store", function () {

        });

        console.log("inserted into db");
    }
});