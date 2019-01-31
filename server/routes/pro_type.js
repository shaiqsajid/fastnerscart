module.exports = function(app) {
    var proType = require('../controllers/pro_type');
	
	app.get('/api/product/types', proType.findAll);
			
	// Find a single Product Type by Name
    app.get('/api/product/type_by_name/:proTypeName', proType.findByName);
	
	// Find all Product Types of a Brand
    app.get('/api/product/type_by_brand_id/:brandId', proType.findByBrandId);
    
}