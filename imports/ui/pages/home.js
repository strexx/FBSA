import './home.html';

//Meteor.call("checkUpdates");

if (Meteor.users.find().count() === 0) {
    // Insert test user for online testing
    var testUser = {
        userId: "cPR5LgqHfEGwEzdC8",
        username: 'test@test.nl',
        password: '123456'
    };

    // Create user - package: accounts-password
    Accounts.createUser(testUser, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('User ' + testUser.username + ' added');
        Meteor.logout();
      }
    });
}

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

Template.home.events({
    'click .hideBox': function(e) {
        var box = document.querySelector(".messageBox");
        box.classList.add("hide");
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
                //console.log(mapMarkers[index]);
                //infowindow.open(map, mapMarkers[index]);
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
