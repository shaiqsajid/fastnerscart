
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const AmountSchema = mongoose.Schema({
	amount: String,
    
});

module.exports = mongoose.model('Amount', AmountSchema);