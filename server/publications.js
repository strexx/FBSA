'use strict';

Meteor.publish("storages", function() {
    return Storages.find({});
});

Meteor.publish("markers", function publishFunction() {
    return Markers.find({});
});

Meteor.startup(function() {
    //Markers.remove({});
    //Markers.update({_id: "B8Fx5qdp3syTZYbwv"}, {$set: {occupancy: 250, totalSpots: 520}});
    //Markers.update({}, {$set: {occupancy: 250, totalSpots: 520}});
    //Markers.update({}, {$set: {occupancy: 250, totalSpots: 520}}, {multi: true});
});
