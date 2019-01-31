
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const DimensionsSchema = mongoose.Schema({
    size:{
    required:true,
    type:String,
    unique:1
    },
    length:{
        required:true,
        type:String
        },
    D: {
        required:true,
        type:String
        },
    F: {
        required:true,
        type:String
        },
    S: {
        required:true,
        type:String
        },
    E: {
        required:true,
        type:String
        },
    L: {
        required:true,
        type:String
        },
    T: {
        required:true,
        type:String
        },
    pro_item:{type: Schema.Types.ObjectId, ref: 'ProItems'},
    amount:{
        required:true,
        type:String
        },
    type:{
        required:true,
         type:String
         },
    standard:{
        required:true,
         type:String
         }
            

});

module.exports = mongoose.model('Dimensions', DimensionsSchema);