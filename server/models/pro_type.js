const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProTypeSchema = mongoose.Schema({
    name: String,
    details: String,
    image:[],
	pro_brand : { type: Schema.Types.ObjectId, ref: 'ProBrands' }
});

module.exports = mongoose.model('ProTypes', ProTypeSchema);