import './register.html';

Template.register.helpers({
    storage: function() {
        var storageId = FlowRouter.getParam("id");
        var storage = Markers.findOne({ _id: storageId });
        return storage;
    },
    loggedIn: function() {
        if (Meteor.user()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.register.events({
    'submit .register': function(event) {

        event.preventDefault();

        // Google maps API key
        // const apikey = "AIzaSyBROKXfjTN_rZMV6x2LoPaDs8DWc5t__dA";
        // var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

        const target = event.target;
        const address = target.address.value;
        const title = target.title.value;
        const postal = target.postal.value;
        const lat = target.lat.value;
        const lng = target.lng.value;
        const totalCapacity = target.total_capacity.value;
        const occupancy = target.occupancy.value;

        // var newUrl = url + address + "&key=" + apikey;

        // Meteor.call("getAddress", url, function(error, response) {
        //     console.log(response);            
        // });

        var set = {
            adres: address,
            lat: lat,
            lng: lng,
            markerIcon: "images/green.png",
            occupancy: occupancy,
            postcode: postal,
            title: title,
            totalSpots: totalCapacity,
            userId: Meteor.userId()
        };

        console.log(set);

        Meteor.call('addStorage', set);

        //console.log(set);

        //Meteor.call('registerStorage', set);        

    }
});
