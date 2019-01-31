const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProItemSchema = mongoose.Schema({
    name: {
        type:String,
        unique:1,
        required:true,
        maxlenth:100
    },
    model: String,
    image_s:[],
    image_b:[],
    description:String,
    shipping:String,
    instock:String,
    publish:String,
    standard:String,
    dimensions:[{
        type:Schema.Types.ObjectId,
        ref:'Dimensions'
    }],
    pro_type : { type: Schema.Types.ObjectId, ref: 'ProTypes' },
    pro_brand : { type:Schema.Types.ObjectId, ref : 'ProBrands'}
});

module.exports = mongoose.model('ProItems', ProItemSchema);