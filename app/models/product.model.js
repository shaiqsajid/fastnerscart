const Company = require('../models/company.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    name: String,
    details: String,
    image:String,
	company : { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Product', ProductSchema);