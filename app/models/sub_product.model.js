const Product = require('./company.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SubProductSchema = mongoose.Schema({
    name: String,
    model: String,
    image_s:String,
    image_b:String,
    size:[{
        type:Schema.Types.ObjectId,
        ref:'Size',
        required:true
    }],
    length:[{
        type:Schema.Types.ObjectId,
        ref:'Length',
        required:true
    }],
    dimensions:[{
        type:Schema.Types.ObjectId,
        ref:'Dimensions',
        required:true
    }],
    amount:[{
        type:Schema.Types.ObjectId,
        ref:'Amount',
        required:true
    }],
	product : { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('SubProduct', SubProductSchema);