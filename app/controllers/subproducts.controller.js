const Product = require('../models/product.model.js');
const SubProduct=require('../models/sub_product.model');
const Dimension=require('../models/dimensions.model');
exports.addSubpro=(req,res)=>{
	var subProduct=new SubProduct(req.body);
	subProduct.save((err,doc)=>{
		if(err) return res.status(400).json({success: false,error: err });
		res.status(200).json({success:true,subproduct: doc});
	});
};

exports.addDimension=(req,res)=>{
	var subProduct=new SubProduct(req.body);
var dimensions= new Dimension(req.body); 
dimensions.save((err,doc)=>{
	if(err) return res.send(err);
	
	SubProduct.findOneAndUpdate(
	{_id: req.body.subProduct},
	{ $push:{ dimensions:doc._id}},
	{ new: true },
	(err,doc)=>{
		if(err) return res.json({success:false,err});
		res.status(200).json(doc.cart)
	}
);
	res.send(doc);
});


}
// Find a subproduct by id
exports.findById = (req, res) => {
	SubProduct.findOne({ _id: req.params.id })
	.populate('dimensions')
	.populate('product')
	.exec(function (err, subproduct) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Student not found with given firstname " + req.params.firstname
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Student with given firstname" + req.params.firstname
			});
		}
					
		res.send(subproduct);
	});
};
exports.findAllSubPro= (req, res) => {
	SubProduct.find()
	.populate('dimensions')
	.populate('product')
	.exec(function (err, subproduct) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Student not found with given firstname " + req.params.firstname
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Student with given firstname" + req.params.firstname
			});
		}
					
		res.send(subproduct);
	});
};
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
