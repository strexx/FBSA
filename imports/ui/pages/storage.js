import './storage.html';

//console.log(Meteor.userId());

//console.log(Markers.find({}, {sort: {userId: "3nezGngQ9nWgEDJn4g"}}));

//console.log(Markers.find({}));

Template.storage.helpers({
    storages: function() {
        return Markers.find({userId: Meteor.userId()});
    },
    loggedIn: function() {
        if(Meteor.user()) {
            return true;
        }
        else{
            return false;
        }
    }
});
