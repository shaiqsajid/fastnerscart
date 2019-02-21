const mongoose=require('mongoose');
const ProItem=require('../models/pro_item');
const Dimension=require('../models/dimensions');
exports.addProItem=(req,res)=>{
	
	var proItem=new ProItem(req.body);
	proItem.save((err,doc)=>{
		if(err) return res.status(400).json({success: false,message: err });
		res.status(200).json({success:true, proItem: doc});
	});
};

exports.addDimension=(req,res)=>{
	var proItem=new ProItem(req.body);
var dimensions= new Dimension(req.body); 
dimensions.save((err,doc)=>{
	if(err) return res.json({success:false,message:err});
	
	ProItem.findOneAndUpdate(
	{_id: req.body.pro_item},
	{ $push:{ dimensions:doc._id}},
	{ new: true },
	(err,doc)=>{
		if(err) return res.json({success:false,err});
		//res.status(200).json({})
	}
);
	res.status(200).json({success:true,dimensions:doc});
});


}
// Find a product item by id
exports.findById = (req, res) => {
	ProItem.findOne({ _id: req.params.id })
	.populate('dimensions')
	.populate('pro_type')
	.exec(function (err, proItem) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({success:false,
					message: "Product item not found with given id " + req.params.id
				});                
			}
			return res.status(500).send({
				success:false,
				message: "Error retrieving Product item with given id" + req.params.id
			});
		}
					
		res.status(200).json({success:true,productItem:proItem});
	});
};
exports.findAllProItems= (req, res) => {
	ProItem.find()
	//.populate('dimensions')
	//.populate('pro_type')
	.exec(function (err, proItems) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					success:false,
					message: "Product items not found"});                
			}
			return res.status(500).send({
				success:false,
				message: "Error retrieving Product items"
			});
		}
					
		//res.status(200).json({success:true,productItems:proItems});
		res.status(200).send(proItems);
	});
};
exports.itemById=(req,res)=>{
	let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    ProItem.
	find({ '_id':{$in:items}}).
	populate('dimensions').
    populate('pro_item').
    populate('pro_brand').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
};
exports.productItemsForShop=(req,res)=>{

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

	ProItem.
	find(findArgs).
	populate('pro_type').

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

// Find all products by a CompanyId
exports.findByProTypetId = (req, res) => {
	
    ProItem.find({ pro_type : req.params.proTypeId })
	//.populate('dimensions')
	//.populate('pro_type')
	.exec(function (err, proItms) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({success:false,
					message: "Product Item not found with given product type Id " + req.params.proTypeId
				});                
			}
			return res.status(500).send({success:false,
				message: "Error retrieving Product Item  with given product Type Id " + req.params.proTypeId
			});
		}
					
		res.status(200).json({success:true,proItems:proItms});
	});
};
