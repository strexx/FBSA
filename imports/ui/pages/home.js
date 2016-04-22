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
    Meteor.call("getStorages", function(error, items) {
        var storagesMarkers = items,
            mapMarkers = [],
            infowindows = [],
            infowindow = null;

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
                //console.log(this);
            })
        });
    });
}

Template.home.onCreated(function() {

    GoogleMaps.ready('map', function(map) {

        setMarkers(map);

        Markers.find().observe({
            added: function(document) {
                if (document.lat && document.lng) {
                    var newPos = new google.maps.LatLng(document.lat, document.lng);
                    var marker = new google.maps.Marker({
                        position: newPos,
                        map: map.instance,
                        adres: document.adres,
                        title: document.title,
                        icon: document.markerIcon,
                        id: document._id
                    });
                    console.log("Added record");
                }
            },
            changed: function(newDocument, oldDocument) {
                var newPos = new google.maps.LatLng(newDocument.lat, newDocument.lng);
                var marker = new google.maps.Marker({
                    position: newPos,
                    map: map.instance,
                    adres: newDocument.adres,
                    title: newDocument.title,
                    icon: newDocument.markerIcon,
                    id: newDocument._id
                });
                console.log("Updated record");
            },
            removed: function(oldDocument) {

                var oldPos = new google.maps.LatLng(oldDocument.lat, oldDocument.lng);
                var marker = new google.maps.Marker({
                    position: oldPos,
                    id: oldDocument._id
                });

                marker.setMap(null);
                delete marker;

                // Dirty hack, needs to be edited
                location.reload();

                console.log("Deleted record " + oldDocument._id);
            }
        });
    });
});
