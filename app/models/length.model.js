const mongoose = require('mongoose'), Schema = mongoose.Schema;

const LengthSchema = mongoose.Schema({
	length: String,
});

module.exports = mongoose.model('Length', LengthSchema);