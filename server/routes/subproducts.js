module.exports = function(app) {
    var subProducts = require('../controllers/subproducts');
	
	app.post('/api/subproduct', subProducts.addSubpro);
	app.post('/api/dimensions',subProducts.addDimension);	
	app.get('/api/subproduct/:id', subProducts.findById);
	app.get('/api/subproducts', subProducts.findAllSubPro);	
 	app.get('/api/subproduct/product/:productId', subProducts.findByProductId);

	// Find a single Product by Name
   // app.get('/api/products/:productName', products.findByName);
	
	// Find all Products of a Company
   // app.get('/api/products/company/:productId', subProducts.findByProductId);
}