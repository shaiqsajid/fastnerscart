module.exports = function(app) {
    var proType = require('../controllers/pro_type');
	
    app.get('/api/product/types', proType.findAll);
    app.post('/api/product/pro_type', proType.addProType);
			
	// Find a single Product Type by Name
    app.get('/api/product/type_by_name/:proTypeName', proType.findByName);
	
	// Find all Product Types of a Brand
    app.get('/api/product/type_by_brand_id/:brandId', proType.findByBrandId);
    
}