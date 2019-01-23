const Product = require('../models/product.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
	name: String,
    details: String,
});

module.exports = mongoose.model('Company', CompanySchema);