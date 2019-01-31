const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProBrandSchema = mongoose.Schema({
	name: String,
    details: String,
});

module.exports = mongoose.model('ProBrands', ProBrandSchema);