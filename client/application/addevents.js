/**
 * Created by ishanguru on 12/18/16.
 */

import { Events } from '../../collections/events.js';

Template.addEvents.helpers({

});

Template.addEvents.events({
    'submit .eventsForm': function (event) {
        event.preventDefault();

        var target = event.target;

        var category = target.category.value;
        var location = target.location.value;
        var description = target.location.value;
        var date = new Date();
        var name = target.name.value;
        var host =  Meteor.userId();

        console.log(host);

        console.log(category);
        console.log(location);
        console.log(description);

        Meteor.call("store", category, description, name, host, location,  function () {

        });

        console.log("inserted into db");
    }
});