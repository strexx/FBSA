import './home.html';

GoogleMaps.load();

Template.home.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                mapTypeControl: false,
                center: new google.maps.LatLng(52.3702157, 4.895167899999933),
                zoom: 14,
                minZoom: 14
            };
        }
    },
    markers: function() {
        return Markers.find({});
    },
    loggedIn: function() {
        if (Meteor.user()) {
            return true;
        } else {
            return false;
        }
    }
});

function setMarkers(map) {
    var storagesMarkers = Markers.find().fetch(),
        mapMarkers = [],
        infowindows = [],
        infowindow =  null;

    storagesMarkers.forEach(function(storage, index) {

        var pos = new google.maps.LatLng(storage.lat, storage.lng);

        mapMarkers[index] = new google.maps.Marker({
            position: pos,
            map: map.instance,
            adres: storage.adres,
            title: storage.title,
            icon: storage.markerIcon,
            id: storage._id
        });
        var infowindow = new google.maps.InfoWindow({
            content: storage.title
        });

        google.maps.event.addListener(mapMarkers[index], 'click', function() {
            // console.log(Infowindow.open)
            // console.log(map)
            // console.log(mapMarkers[index]);
            infowindow.open(map, this);
            console.log(this);
        })
    });
}

Template.home.onCreated(function() {

    GoogleMaps.ready('map', function(map) {

        setMarkers(map);

        Markers.find().observe({
            changed: function(newDocument, oldDocument) {
                setMarkers(map);
            }
        });

        // var parkeerlocaties = results.data.parkeerlocaties;
        // parkeerlocaties.forEach(function(storage, index) {
        //     var title = storage.parkeerlocatie.title;
        //     var coords = JSON.parse(storage.parkeerlocatie.Locatie);
        //     var lng = coords.coordinates[0];
        //     var lat = coords.coordinates[1];
        //     var adres = storage.parkeerlocatie.adres;
        //     var postcode = storage.parkeerlocatie.postcode;
        //     //Markers.insert({ title: title, lat: lat, lng: lng, adres: adres, postcode: postcode, userId: 1, markerIcon: "images/green.png" });
        // });
    });
});
