const Product = require('./company.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SubProductSchema = mongoose.Schema({
    name: String,
    model: String,
    image_s:String,
    image_b:String,
    
    dimensions:[{
        type:Schema.Types.ObjectId,
        ref:'Dimensions'
    }],
    
	product : { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('SubProduct', SubProductSchema);