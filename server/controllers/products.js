const Company = require('../models/company.js');
const Product = require('../models/product.js');
const SubProduct = require('../models/sub_product');

exports.findAll = (req, res) => {
	
	Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.productForShop=(req,res)=>{

		let order = req.body.order ? req.body.order : "desc";
		let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
		let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
		let skip = parseInt(req.body.skip);
		let findArgs = {};
	
		for(let key in req.body.filters){
			if(req.body.filters[key].length >0 ){
				if(key === 'price'){
					findArgs[key] = {
						$gte: req.body.filters[key][0],
						$lte: req.body.filters[key][1]
					}
				}else{
					findArgs[key] = req.body.filters[key]
				}
			}
		}
	
	   // findArgs['publish'] = true;
	
		SubProduct.
		find(findArgs).
		populate('product').
		//populate('wood').
		sort([[sortBy,order]]).
		skip(skip).
		limit(limit).
		exec((err,articles)=>{
			if(err) return res.status(400).send(err);
			res.status(200).json({
				size: articles.length,
				articles
			})
		})
	
};
// Find a Products by Name
exports.findByName = (req, res) => {
	Product.findOne({ name: req.params.productName })
	.populate('company')
	.exec(function (err, product) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given name " + req.params.productName
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.productName
			});
		}
					
		res.send(product);
	});
};

// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
    Product.find({ company : req.params.companyId })
	.exec(function (err, products) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given Company Id " + req.params.companyId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.companyId
			});
		}
					
		res.send(products);
	});
};
