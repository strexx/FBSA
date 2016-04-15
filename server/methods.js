Meteor.methods({
    getApiData: function() {
        this.unblock();
        return Meteor.http.call("GET", "http://open.datapunt.amsterdam.nl/ivv/parkeren/locaties.json");
    }
});

// Meteor.call("getApiData", function(error, results) {
//     var parkeerlocaties = results.data.parkeerlocaties;
//     parkeerlocaties.forEach(function(storage, index) {
//         var title = storage.parkeerlocatie.title;
//         var coords = JSON.parse(storage.parkeerlocatie.Locatie);
//         var lng = coords.coordinates[0];
//         var lat = coords.coordinates[1];
//         var adres = storage.parkeerlocatie.adres;
//         var postcode = storage.parkeerlocatie.postcode;
//         Markers.insert({ title: title, lat: lat, lng: lng, adres: adres, postcode: postcode, userId: 1, markerIcon: "images/green.png" });
//     });
// });