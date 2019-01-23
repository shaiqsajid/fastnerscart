const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SizeSchema = mongoose.Schema({
	size: String,
});

module.exports = mongoose.model('Size', SizeSchema);