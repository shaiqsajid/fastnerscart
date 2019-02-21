module.exports = function(app) {
	var proItem = require('../controllers/pro_item');
	
	app.post('/api/product/pro_item', proItem.addProItem);
	app.post('/api/product/dimensions',proItem.addDimension);	
	app.get('/api/product/item/:id', proItem.findById);
	app.get('/api/product/items', proItem.findAllProItems);	
	app.get('/api/product/items_by_type_id/:proTypeId', proItem.findByProTypetId);
	app.post('/api/product/shop',proItem.productItemsForShop);
	app.get('/api/product/item_by_id',proItem.itemById);
}