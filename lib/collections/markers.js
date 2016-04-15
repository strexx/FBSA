Markers = new Mongo.Collection('markers');

Markers.allow({
  update: function (userId, doc, fields, modifier) {
    return true;
  }
});