/**
 * Created by ishanguru on 11/21/16.
 */

import { Events } from '../../collections/events.js';

Template.home.onCreated(function() {
    console.log(Meteor.user());
});

Template.home.helpers({

    tempfunc : function () {
        var allValues = Events.find({}, {
            sort: {createdAt: -1}
        }).fetch();
        // console.log(allValues);
        return allValues;
    }

});