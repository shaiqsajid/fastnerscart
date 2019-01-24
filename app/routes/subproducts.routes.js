module.exports = function(app) {
    var subProducts = require('../controllers/subproducts.controller');
	
	app.post('/api/subproduct', subProducts.addSubpro);
	app.post('/api/dimensions',subProducts.addDimension);	
	app.get('/api/subproducts/:id', subProducts.findById);
	app.get('/api/subproducts', subProducts.findAllSubPro);	
	// Find a single Product by Name
   // app.get('/api/products/:productName', products.findByName);
	
	// Find all Products of a Company
   // app.get('/api/products/company/:companyId', products.findByCompanyId);
}