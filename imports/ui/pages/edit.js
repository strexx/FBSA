import './edit.html';

//console.log(Markers.find({}, {sort: {userId: "3nezGngQ9nWgEDJn4g"}}));

//Markers.update({_id: "B8Fx5qdp3syTZYbwv"}, {$set: {occupancy: 250, totalSpots: 520}});

Template.edit.helpers({
    storage: function() {
        var storageId = FlowRouter.getParam("id");
        var storage = Markers.findOne({ _id: storageId });
        return storage;
    },
    freespots: function() {
        var storageId = FlowRouter.getParam("id");
        var freespots = Markers.findOne({ _id: storageId });
        return freespots.totalSpots - freespots.occupancy;
    },
    loggedIn: function() {
        if (Meteor.user()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.edit.events({
    'submit .modify': function(event) {

        event.preventDefault();

        const target = event.target;
        const occupancy = target.occupancy.value;
        var storageId = FlowRouter.getParam("id");

        Markers.update({ _id: storageId }, {
            $set: { occupancy: occupancy }
        });

        var storage = Markers.findOne({ _id: storageId });
        var percentage = storage.occupancy / storage.totalSpots * 100;
        var icon;

        if (percentage > 70) {
            icon = 'images/red.png';
        } else if (percentage > 30 && percentage < 70) {
            icon = 'images/orange.png';
        } else {
            icon = 'images/green.png';
        }

        Markers.update({ _id: storageId }, {
            $set: { markerIcon: icon }
        });
    }
});
