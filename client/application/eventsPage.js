/**
 * Created by su jiaxin on 12/23/16.
 */

import { Events } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';

have_event = false;

Template.eventsPage.onCreated(function() {
    console.log(Meteor.userId());
});

Template.eventsPage.helpers({
    checkHostEvent : function() {
        Meteor.call("find_host_events", Meteor.userId(), function(err, data){
            if(err) {
                console.log("in eventspage - call back - " + err);
            }
            console.log("in eventspage -  call back: ");
            console.log(data);
            console.log(typeof(data));
            if(data[0]) { // when return true, display the events in table format
                $('#no_event_text').remove();
                console.log("in check - change form");
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
                    console.log(data[1]);
                    var event = data[1][i];
                    console.log("events type: " + typeof(event));
                    var category = event.category;
                    var description = event.description;
                    var event_date = event.eventDate;
                    var location = event.location;
                  //  var host = event.host;
                    var host = "You";
                    var event_name = event.name;
                    var people_coming = event.users; // an array of string
                    console.log(category+"&&"+description+"&&"+event_date+"&&"+location+"&&"+host+"&&"+event_name+"&&"+people_coming);
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
                console.log("in going - call back - " + err);
            }
            console.log("in going -  call back: ");
            console.log(data);
            console.log(typeof(data));
            if(data[0]) { // when return true, display the events in table format
                console.log("in going - adding table");
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
                    console.log(data[1]);
                    var event = data[1][i];
                    console.log("events type: " + typeof(event));
                    var category = event.category;
                    var description = event.description;
                    var event_date = event.eventDate;
                    var location = event.location;
                    var host_id = event.host;
                    var host = (CurrentUsers.find({userId: host_id}).fetch())[0].name;
                    console.log(host);
                    var event_name = event.name;
                    var people_coming = event.users; // an array of string
                    console.log("in going to event @#$%&*%$#@#$%^&*");
                    console.log(category+"&&"+description+"&&"+event_date+"&&"+location+"&&"+host+"&&"+event_name+"&&"+people_coming);
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
            console.log("in the form");
        }
        else {
            $('#event_page_top_form_content').show();
            form.style.display = 'none';
            $('#top_button span').remove();
            $('#top_button').append('<span>ADD EVENT</span>');
            add_event_form_shown = true;
            console.log("not in the form");
        }
    }
});



















