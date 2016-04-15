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
    //Markers.update({_id: "uowv6NRi4C8rPj8hg"}, {$set: {userId: "cPR5LgqHfEGwEzyC8"}});
    //Markers.update({}, {$set: {occupancy: 250, totalSpots: 520}});
    //Markers.update({}, {$set: {occupancy: 250, totalSpots: 520}}, {multi: true});
});
