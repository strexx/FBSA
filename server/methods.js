Meteor.methods({
    getApiData: function() {
        this.unblock();
        return Meteor.http.call("GET", "http://open.datapunt.amsterdam.nl/ivv/parkeren/locaties.json");
    },
    getAddress: function(url) {
        this.unblock();
        return Meteor.http.call("GET", url);
    },
    updateOccupancy: function(storageId, occupancy) {
        Markers.update({ _id: storageId }, {
            $set: { occupancy: occupancy }
        });
    },
    updateMarkerIcon: function(storageId, icon) {
        Markers.update({ _id: storageId }, {
            $set: { markerIcon: icon }
        });
    },
    findStorage: function(storageId) {
        return Markers.findOne({ _id: storageId });
    },
    getStorages: function() {
        return Markers.find().fetch();
    },
    addStorage: function(storage) {
        Markers.insert(storage);
    },
    removeStorage: function(storageId) {
        Markers.remove(storageId);
    },
    checkUpdates: function() {
        var markers = Markers.find().fetch(),
            hasMatch;
        Meteor.call("getApiData", function(error, results) {
            if (results) {
                markers.forEach(function(marker) {
                    var parkeerlocaties = results.data.parkeerlocaties;
                    parkeerlocaties.forEach(function(storage, index) {
                        if (storage.adres == marker.adres) {
                            hasMatch = true;
                        } else {
                            var title = storage.parkeerlocatie.title;
                            var coords = JSON.parse(storage.parkeerlocatie.Locatie);
                            var lng = coords.coordinates[0];
                            var lat = coords.coordinates[1];
                            var adres = storage.parkeerlocatie.adres;
                            var postcode = storage.parkeerlocatie.postcode;
                            Markers.insert({ title: title, lat: lat, lng: lng, adres: adres, postcode: postcode, userId: "cPR5LgqHfEGwEzdC8", markerIcon: "images/green.png" });
                            hashMatch = false;
                        }
                    });
                });
            } else {
                console.log(error);
            }
        });
    }
});
