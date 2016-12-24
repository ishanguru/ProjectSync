/**
 * Created by su jiaxin on 12/23/16.
 */

import { Events } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';

have_event = false;

Template.eventsPage.onCreated(function() {
});

Template.eventsPage.helpers({
    checkHostEvent : function() {
        Meteor.call("find_host_events", Meteor.userId(), function(err, data){
            if(err) {
            }
            if(data[0]) { // when return true, display the events in table format
                $('#no_event_text').remove();
                var table = "<h3>Events You hosts</h3><table id=\"host_event_table\"><thead><tr>" +
                    "<th>Category</th>" +
                    "<th>Host</th>" +
                    "<th>Event Name</th>" +
                    "<th>Description</th>" +
                    "<th>Location</th>" +
                    "<th>Event Date</th>" +
                    "<th>Who Are Coming</th>" +
                    "</tr></thead><tbody>";
                for(var i = 0; i < data[1].length; i++) {
                    var event = data[1][i];
                    var category = event.category;
                    var description = event.description;
                    var event_date = event.eventDate;
                    var location = event.location;
                    //  var host = event.host;
                    var host = "You";
                    var event_name = event.name;
                    var people_coming = event.users; // an array of string
                    var row_data = "<tr>"
                        + "<td>" + category + "</td>"
                        + "<td>" + host + "</td>"
                        + "<td>" + event_name + "</td>"
                        + "<td>" + description + "</td>"
                        + "<td>" + location + "</td>"
                        + "<td>" + event_date + "</td>"
                        + "<td>" + people_coming + "</td>"
                        + "</tr>";
                    table += row_data;
                }
                table += "</tbody></table><br /><br />";
                $('#event_block_1').append(table);
            }
        });
    },

    getGoingEvent : function() {
        Meteor.call("find_going_events", Meteor.userId(), function(err, data){
            if(err) {
            }
            if(data[0]) { // when return true, display the events in table format
                var table = "<h3>Events You Are Going</h3><table id=\"going_event_table\"><thead><tr>" +
                    "<th>Category</th>" +
                    "<th>Host</th>" +
                    "<th>Event Name</th>" +
                    "<th>Description</th>" +
                    "<th>Location</th>" +
                    "<th>Event Date</th>" +
                    "<th>Who Are Coming</th>" +
                    "</tr></thead><tbody>";
                for(var i = 0; i < data[1].length; i++) {
                    var event = data[1][i];
                    var category = event.category;
                    var description = event.description;
                    var event_date = event.eventDate;
                    var location = event.location;
                    var host_id = event.host;
                    var host = (CurrentUsers.find({userId: host_id}).fetch())[0].name;
                    var event_name = event.name;
                    var people_coming = event.users; // an array of string
                    var row_data = "<tr>"
                        + "<td>" + category + "</td>"
                        + "<td>" + host + "</td>"
                        + "<td>" + event_name + "</td>"
                        + "<td>" + description + "</td>"
                        + "<td>" + location + "</td>"
                        + "<td>" + event_date + "</td>"
                        + "<td>" + people_coming + "</td>"
                        + "</tr>";
                    table += row_data;
                }
                table += "</tbody></table><br /><br />";
                $('#event_block_2').append(table);
            }
        });
    },

    hostingEvents : function () {
        var allValues = Events.find({host : Meteor.userId()}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    },

    goingEvents : function () {
        var allValues = Events.find({users : {$in: [Meteor.userId()]}}, {
            sort: {createdAt: -1},
            limit: 10
        }).fetch();
        // console.log(allValues);
        return allValues;
    },

    usersFunction : function (users) {
        console.log(users.length);
        var whosgoing = "Who's going? ";
        if (users.length > 1) {
            for (var i = 0; i < users.length; i++) {
                console.log(users[i]);
                if (users[i] != "temp") {
                    var host = (CurrentUsers.find({userId: users[i]}).fetch())[0].name;
                    console.log(host);
                    if (host != null) {
                        whosgoing = whosgoing + host + " ";
                    }
                }
            }
            console.log(whosgoing);
        }
        return whosgoing;
    },

    totalUsers : function (users) {
        console.log(users.length);
        if (users.length > 1) {
            for (var i = 0; i < users.length; i++) {
                console.log(users[i]);
                if (users[i] != "temp") {
                    return users.length-1;
                }
            }
        }
    }

});

add_event_form_shown = false;

Template.eventsPage.events({
    'click #top_button': function(){
        event.preventDefault();

        var form = document.getElementById("event_page_top_form_content");
        if (add_event_form_shown) {
            form.style.display = 'block';
            //  form.style.width = '100%';
            form.style.marginLeft = '30%';
            $('#top_button span').remove();
            $('#top_button').append('<span>HIDE FORM</span>');
            add_event_form_shown = false;
        }
        else {
            $('#event_page_top_form_content').show();
            form.style.display = 'none';
            $('#top_button span').remove();
            $('#top_button').append('<span>ADD EVENT</span>');
            add_event_form_shown = true;
        }
    },

    'submit .eventsForm': function (event) {
        event.preventDefault();

        var target = event.target;

        var category = target.category.value;
        var location = target.location.value;
        var description = target.location.value;
        var date = target.date.value;
        console.log(date);
        var name = target.name.value;
        var host =  Meteor.userId();

        console.log(host);

        console.log(category);
        console.log(location);
        console.log(description);

        Meteor.call("store", category, description, name, host, location, date, function () {

        });

        console.log("inserted into db");
    },

    'click .cancelevent': function (event) {
        console.log("cancelled event");
        var target = event.target;

        var eventId = target.id;

        Meteor.call("cancelEvents", eventId, function () {

        });
        //get this event ID, update the record in user, by appending this event ID to their events array
    },

    'click .leaveevent': function (event) {
        console.log("left event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();

        Meteor.call("leaveEvents", userId, eventId, function () {

        });
        //get this event ID, update the record in user, by appending this event ID to their events array
    }
});