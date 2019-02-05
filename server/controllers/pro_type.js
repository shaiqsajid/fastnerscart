const ProType = require('../models/pro_type');
const ProItem = require('../models/pro_item');

exports.findAll = (req, res) => {
	
	ProType.find()
    .then(proTypes => {
	   // res.status(200).json({success:true,pro_types:proTypes});
	   res.status(200).send(proTypes);
    }).catch(err => {
        res.status(500).send({
			success:false,
            message: err.message
        });
    });
};

//add protype
exports.addProType=(req,res)=>{
	const type = new ProType(req.body);

    type.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            types: doc
        })
    })
};

// Find a ProductType by Name
exports.findByName = (req, res) => {
	ProType.findOne({ name: req.params.proTypeName })
	.populate('pro_brand')
	.exec(function (err, proType) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					success:false,
					message: "ProductType not found with given name " + req.params.proTypeName
				});                
			}
			return res.status(500).send({
				success:false,
				message: "Error retrieving Product Type with given name " + req.params.proTypeName
			});
		}
					
		res.status(200).json({success:true,pro_type:proType});
	});
};

// Find all products by a CompanyId
exports.findByBrandId = (req, res) => {
    ProType.find({ pro_brand : req.params.brandId })
	.exec(function (err, proType) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					success:false,
					message: "Product Type not found with given brand Id " + req.params.brandId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Product Type with given brand Id " + req.params.brandId
			});
		}
					
		res.status(200).json({success:true,pro_type:proType});
	});
};
