module.exports = function(app) {

	var proBrand = require('../controllers/pro_brand')
	
	app.get('/api/product/brand/init', proBrand.init);
	app.get('/api/product/brands', proBrand.findAll);
}