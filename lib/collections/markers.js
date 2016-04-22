Markers = new Mongo.Collection('markers');

Markers.allow({
    update: function(userId, doc, fields, modifier) {
        return true;
    }
});

Markers.schema = new SimpleSchema({
    _id: { type: String },
    adres: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    markerIcon: { type: String },
    occupancy: { type: Number },
    postcode: { type: String },
    title: { type: String },
    totalSpots: { type: Number },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});