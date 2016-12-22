import { Events } from '../../collections/messages.js';

Template.messages.helpers({
    getMessages: function(){
        console.log("called");
        if (Meteor.call("getCurrentMessages")==null){
            return false;
        }
        else{
            return true;
        }
    }
});

Template.body.events({
    'click #submit_button': function(e){
        e.preventDefault();
        console.log("ikmklmklmklm");
        //$("#messaging").remove();
        //$("$submit_button").append("asdasd");
    }
});

/*Template.addEvents.events({
    'submit eventsForm': function (event) {
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
});*/
