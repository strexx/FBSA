// Insert sample data if the markers collection is empty
if (Markers.find().count() === 0) {
    try {
        Meteor.call("getApiData", function(error, results) {
            if (error) {
                JSON.parse(Assets.getText("markers.json")).marker.forEach(function(doc) {
                    Markers.insert(doc);
                    console.log(doc + " added");
                });
            } else {
                var parkeerlocaties = results.data.parkeerlocaties;
                parkeerlocaties.forEach(function(storage, index) {
                    var title = storage.parkeerlocatie.title;
                    var coords = JSON.parse(storage.parkeerlocatie.Locatie);
                    var lng = coords.coordinates[0];
                    var lat = coords.coordinates[1];
                    var adres = storage.parkeerlocatie.adres;
                    var postcode = storage.parkeerlocatie.postcode;
                    Markers.insert({ title: title, lat: lat, lng: lng, adres: adres, postcode: postcode, userId: "cPR5LgqHfEGwEzdC8", markerIcon: "images/green.png" });
                });
            }
        });
    } catch (e) {
        console.log(e);
    }
}
