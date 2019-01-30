const Product = require('./product.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
	name: String,
    details: String,
});

module.exports = mongoose.model('Company', CompanySchema);