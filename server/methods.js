Meteor.methods({
    getApiData: function() {
        this.unblock();
        return Meteor.http.call("GET", "http://open.datapunt.amsterdam.nl/ivv/parkeren/locaties.json");
    }
});