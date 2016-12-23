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
        $("#messaging").remove();
        $("nomessages").remove();
        $("#textArea").append(' <form class="eventsForm"><div class="form-group row">'+
                            '<label for="etf_symbol" class="col-sm-2 col-form-label">Recipients</label><div class="col-sm-4">'+
                            '<input type="text" class="form-control" id="recipients" required></div></div>'+
                            '<div class="form-group row"><label for="orderQty" class="col-sm-2 col-form-label">Enter message</label>'+
                            '<div class="col-sm-4"><input type="text" class="form-control" id="message" required></div></div>'+
                            '<div class="form-group row"><div class="col-xs-3">'+
                            '<input type="submit" id="submitButton_new" class="btn btn-success col-sm-3 btn-block" value="Submit">'+
                            '</div></div></form>');
    }, 
    'submit .eventsForm': function(e){
        e.preventDefault();
        
        var target=e.target;
        var recipients=target.recipients.value.split(',');
        var message=target.message.value;
        console.log(recipients);
        console.log(message);

        Meteor.call("storeMessages", recipients, Meteor.userId(), message, function(){
            console.log("Storing");
        });
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
