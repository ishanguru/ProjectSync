/**
 * Created by ishanguru on 11/21/16.
 */

import { Events } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';


Template.home.onCreated(function() {
    console.log(Meteor.user());
});

Template.home.helpers({
    checkEvents: function(){
        var data=Events.find().fetch();
        var events=Events.find({host: Meteor.userId()}).fetch();
        console.log(data);
        console.log(events);
        if(data.length==0 || data.length==events.length){
            console.log("not found");
            return true;
        }
        return false;

    },
    makeProfile: function(){
        if(CurrentUsers.find({userId: Meteor.userId()}, {fields:{name: 1}}).fetch().length==0){
            window.location.replace('/profile');

        }
    },

    joinEventFunction : function () {
        var allValues = Events.find({ host : {$ne: Meteor.userId()}}).fetch();
        console.log(allValues);
        var newArr=[];
        var finalArr=[];
        for(var i = 0; i < allValues.length; i++){
            newArr[i]={'length': allValues[i]['users'].length, 'id':allValues[i]['_id']};
        }
        newArr=newArr.sort(function(a, b){
            if (a['length']>b['length']){
                return -1;
            }
            else if(a['length']<b['length']){
                return 1;
            }
            else{
                return 0;
            }
        });
        for(var i = 0; i<newArr.length; i++){
            for(var j = 0; j < allValues.length; j++){
                if(allValues[j]['_id']==newArr[i]['id']){
                    finalArr[i]=allValues[j];
                }
            }
        }

        return finalArr;
    },

    userGoing : function (users) {
        return users.includes(Meteor.userId());
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

Template.home.events({
    'click .joinevent': function (event) {
        console.log("Joined event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();
        
        Meteor.call("joinEvents", userId, eventId, function () {
            
        });
    },
    'click .leaveevent': function (event) {
        console.log("left event");
        var target = event.target;

        var eventId = target.id;
        var userId = Meteor.userId();

        Meteor.call("leaveEvents", userId, eventId, function () {

        });
    }
});
