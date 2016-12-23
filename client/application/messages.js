import { Events } from '../../collections/messages.js';

Template.messages.helpers({
    getMessages: function(){
        console.log("called");
        var value=null;
        Meteor.call("getCurrentMessages", function(err, data){
            if(err){
                console.log("error");
                return null;
            }
            if(data.length==0){
                 $("#messageText").append('<h2>No messages at this time</h2>');
                return;
            }
            console.log(data);
            for(var i = 0; i < data.length; i++){
                $("#messageText").append('<div class="col-md-12 thumbnail eventpadding">' + data[i] + 
                                    '<input type="submit" id="submitButton_sendm" value="See Messages">'+'</div>');
            }
        });
    }
});

Template.body.events({
    'click #submit_button': function(e){
        e.preventDefault();
        console.log("ikmklmklmklm");
        $("#messaging").remove();
        $("#nomessages").remove();
        $("#textArea").append(' <form class="neweventsForm"><div class="form-group row">'+
                            '<label for="etf_symbol" class="col-sm-2 col-form-label">Recipients</label><div class="col-sm-4">'+
                            '<input type="text" class="form-control" id="recipients" required></div></div>'+
                            '<div class="form-group row"><label for="orderQty" class="col-sm-2 col-form-label">Enter message</label>'+
                            '<div class="col-sm-4"><input type="text" class="form-control" id="message" required></div></div>'+
                            '<div class="form-group row"><div class="col-xs-3">'+
                            '<input type="submit" id="submitButton_new" class="btn btn-success col-sm-3 btn-block" value="Submit">'+
                            '</div></div></form>');
    }, 
    'submit .neweventsForm': function(e){
        e.preventDefault();

        var target=e.target;
        var recipients=target.recipients.value.split(',');
        var message=target.message.value;
        console.log(recipients);
        console.log(message);

        Meteor.call("storeMessages", recipients, message, function(){
            console.log("Storing");
        });

        window.location.replace('/messages');

    }, 
    'click #submitButton_sendm': function(e){
        e.preventDefault();
        var string=$("#messageText").html();
        var name="";
        var index=string.indexOf('>')+1;
        while (string[index]!='<'){
            name=name+string[index];
            index+=1;
        }
        console.log(name);
        $("#messageText").remove();
        $("#messaging").remove();
        Meteor.call("getMessages", name, function(data){

        });
        $("#textArea").append('<input type="submit" id="submitButton_back" class="btn btn-success col-sm-3 btn-block" value="Submit">');
    }, 
    'click #submitButton_back': function(e){
        e.preventDefault();
        window.location.replace('/messages');
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
