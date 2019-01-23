module.exports = function(app) {
    var subProducts = require('../controllers/subproducts.controller');
	
	app.post('/api/subproduct', subProducts.addSubpro);
	app.post('/api/dimensions',subProducts.addDimension);		
	// Find a single Product by Name
   // app.get('/api/products/:productName', products.findByName);
	
	// Find all Products of a Company
   // app.get('/api/products/company/:companyId', products.findByCompanyId);
}