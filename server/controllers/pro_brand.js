const ProBrand = require('../models/pro_brand');
const ProType = require('../models/pro_type');

exports.findAll = (req, res) => {
	ProBrand.find()
    .then(brands => {
				//res.status(200).json({suceess: true,brands:brands});
				res.status(200).send(brands);
    }).catch(err => {
				res.status(500).json({suceess: false,message: err.message});   
			 });
};


exports.addBrand=(req,res)=>{
const proBrand=new ProBrand(req.body);

proBrand.save((err,doc)=>{
	if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            brands: doc
        })
});

};

exports.init = (req, res) => {
	var astm = new ProBrand({ 
	  name: 'ASTM', 
	  details: 'ASTM details.....', 
  
	});
  
	astm.save(function (err) {
	  if(err) return console.error(err.stack)
	  
	  console.log("astm is added")
	  
	  //astm now exists, so lets create a Product
	  var blot = new ProType({
		
		name: "Bolt",
		  details: "Bolt details",
		  image:"images/bolt.png",
			pro_brand: astm._id
	  });
	  
  
	  blot.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("blot is added");
		
	  });
	  
	  var nut = new ProType({
		
			  name: "Nut",
			  details: "Nut details",
			  image:"images/nut.png",
			  pro_brand: astm._id
			  });
	  
			  nut.save(function (err) {
			  if(err) return console.error(err.stack)
			  
			  console.log("nut is added")
			  });
  
			  var pin = new ProType({
		
				  name: "Pin",
				  details: "Pin details",
				  image:"images/pin.png",
				  pro_brand: astm._id
				  });
		  
				  pin.save(function (err) {
				  if(err) return console.error(err.stack)
				  
				  console.log("pin is added")
				  });
  
				  var washer = new ProType({
		
					  name: "Washer",
					  details: "Washer details",
					  image:"images/washer.png",
					  pro_brand: astm._id
					  });
			  
					  blot.save(function (err) {
					  if(err) return console.error(err.stack)
					  
					  console.log("washer is added")
					  });
	});
	
	res.send("Done Initial Data!");
  }