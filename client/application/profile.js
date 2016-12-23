/**
 * Created by su jiaxin on 12/20/16.
 */

import { CurrentUsers } from "../../collections/users"

Template.profile.onCreated(function() {
    console.log(Meteor.userId());
});

curr_id = Meteor.userId();
form_complete = false;

Template.profile.helpers({
    addUserInDB : function() {
        console.log(curr_id);

        Meteor.call("add_curr_user", Meteor.userId(), function(){

        });
        console.log("pass inserting new item in to curr_user");

    },
    checkUserProfileInfo : function() {
        Meteor.call("check_profile_info", Meteor.userId(), function(err, data){
            if(err) {
                console.log("call back - " + err);
            }
            console.log("call back: " + data);
            console.log(typeof(data));
            if(data[0]) { // when return true, display the data
                $('#name').remove();
                $('#bio').remove();
                $('#rowOne').append("<p id=\"user_name\">" + data[1] + "</p>"); // name
                $('#rowTwo').append("<p id=\"user_bio\">" + data[2] + "</p>"); // bio
                console.log("in check - change form");
                form_complete = true;
            }
        });
        console.log("in check user profile Info");
    }
});

Template.profile.events({
    'submit .eventsForm': function(){
        event.preventDefault();
        if (form_complete) {
            $('#user_name').remove();
            $('#user_bio').remove();
            $('#rowOne').append("<input type=\"text\" class=\"form-control\" id=\"name\" style=\"margin-left: 8%;\" required>");
            $('#rowTwo').append("<input type=\"text\" class=\"form-control\" id=\"bio\" style=\"margin-left: 8%;\" required>");
            form_complete = false;
        }
        else {
            console.log("in profileForm");
            const target = event.target;
            const name = target.name.value;
            const bio = target.bio.value;

            console.log(name);
            console.log(bio);

            /* get user and insert data into db */
            Meteor.call("profile_update", curr_id, name, bio, function(){

            });
            console.log("inserted into db");

            /* change html elements */
            $('#name').remove();
            $('#bio').remove();
            $('#rowOne').append("<p id=\"user_name\">" + name + "</p>");
            $('#rowTwo').append("<p id=\"user_bio\">"+ bio + "</p>");
            console.log("XXXXXXXXXXX");
            form_complete = true;
        }

    }
});



