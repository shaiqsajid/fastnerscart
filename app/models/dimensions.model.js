const mongoose = require('mongoose'), Schema = mongoose.Schema;

const DimensionsSchema = mongoose.Schema({
    D: String,
    F: String,
    S: String,
    E: String,
    L: String,
    T: String

});

module.exports = mongoose.model('Dimensions', DimensionsSchema);