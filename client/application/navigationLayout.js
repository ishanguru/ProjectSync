import { Events } from '../../collections/messages.js';
import { Messages } from '../../collections/events.js';
import { CurrentUsers } from '../../collections/users.js';

// function getMessages(){
//     Meteor.call("test")
// };

/*Template.messages.onCreated(function(){
    if ((Meteor.call("getCurrentMessages"))==null){
        
    }
});*/

/*Template.addNavigationEvent.events({
    'submit .navForm': function (event) {
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
