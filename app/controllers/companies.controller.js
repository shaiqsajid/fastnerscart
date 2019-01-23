const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');
const SubProduct = require('../models/sub_product.model');
const Size = require('../models/size.model');
const Length = require('../models/length.model');
const Dimensions = require('../models/dimensions.model');
const Amount = require('../models/amount.model');

exports.init = (req, res) => {
  var astm = new Company({ 
	name: 'ASTM', 
	details: 'ASTM details.....', 

  });

  astm.save(function (err) {
    if(err) return console.error(err.stack)
	
	console.log("astm is added")
	
    //astm now exists, so lets create a Product
    var blot = new Product({
	  
	  name: "Bolt",
		details: "Bolt details",
		image:"images/bolt.png",
	  company: astm._id
	});
	

    blot.save(function (err) {
	  if(err) return console.error(err.stack)
	  
	  console.log("blot is added");
	  var size1=new Size({
		size:"0-80 UNF"
	});
	size1.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var size2=new Size({
		size:"1-72 UNF"
	});
	size2.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});

	var size3=new Size({
		size:"1-64 UNC"
	});
	size3.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var size4=new Size({
		size:"2-64 UNF"
	});
	size4.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var size5=new Size({
		size:"2-56 UNC"
	});
	size5.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var size6=new Size({
		size:"3-48 UNF"
	});
	size6.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});

	var length1=new Length({
		length:"0.125"
	});
	length1.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var length2=new Length({
		length:"0.125"
	});
	length2.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var length3=new Length({
		length:"0.125"
	});
	length3.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var length4=new Length({
		length:"0.125"
	});
	length4.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var length5=new Length({
		length:"0.125"
	});
	length5.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var length6=new Length({
		length:"0.125"
	});
	length6.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});

	var dimensions1=new Dimensions({
		D: "1.5",
		F: "3",
		S: "0.9",
		E: "1.1",
		L: "3.2",
		T: "0.3"
	});
	dimensions1.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var dimensions2=new Dimensions({
		D: "1.9",
		F: "3.6",
		S: "1.3",
		E: "1.4",
		L: "3.2",
		T: "0.4"
	});
	dimensions2.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var dimensions3=new Dimensions({
		D: "1.9",
		F: "3.6",
		S: "1.3",
		E: "1.4",
		L: "3.2",
		T: "0.4"
	});
	dimensions3.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var dimensions4=new Dimensions({
		D: "2.2",
		F: "4.3",
		S: "1.3",
		E: "1.6",
		L: "3.2",
		T: "0.4"
	});
	dimensions4.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var dimensions5=new Dimensions({
		D: "2.2",
		F: "4.3",
		S: "1.3",
		E: "1.6",
		L: "3.2",
		T: "0.4"
	});
	dimensions5.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var dimensions6=new Dimensions({
		D: "2.5",
		F: "4.9",
		S: "1.6",
		E: "1.9",
		L: "3.2",
		T: "0.5"
	});
	dimensions6.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt1=new Amount({
		amount:"1000"
	});
	amunt1.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt2=new Amount({
		amount:"2000"
	});
	amunt2.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt3=new Amount({
		amount:"3000"
	});
	amunt3.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt4=new Amount({
		amount:"4000"
	});
	amunt4.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt5=new Amount({
		amount:"5000"
	});
	amunt5.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	var amunt6=new Amount({
		amount:"6000"
	});
	amunt6.save(function (err) {
		if(err) return console.error(err.stack)
		
		console.log("size1 is added");
		});
	
var subPoduct= new SubProduct({
	name: "Hexagon Socket Flat Countersunk Head Cap Scre inch",
    model: "ANSI B 18.3",
	image_s:"images/small/hsfchcs_s.png",
	image_s:"images/big/hsfchcs_b.png",
	product:blot._id
})
subPoduct.size.push(size1._id,size2._id,size3._id,size4._id,size5._id,size6._id);
subPoduct.length.push(length1._id,length2._id,length3._id,length4._id,length5._id,length6._id);
subPoduct.dimensions.push(dimensions1._id,dimensions2._id,dimensions3._id,dimensions4._id,dimensions5._id,dimensions6._id);
subPoduct.amount.push(amunt1._id,amunt2._id,amunt3._id,amunt4._id,amunt5._id,amunt6._id);
subPoduct.save(function (err) {
	if(err) return console.error(err.stack)
	
	console.log("subPoduct is added");
	});
    });
	
	var nut = new Product({
	  
			name: "Nut",
			details: "Nut details",
			image:"images/nut.png",
			company: astm._id
			});
	
			nut.save(function (err) {
			if(err) return console.error(err.stack)
			
			console.log("nut is added")
			});

			var pin = new Product({
	  
				name: "Pin",
				details: "Pin details",
				image:"images/pin.png",
				company: astm._id
				});
		
				pin.save(function (err) {
				if(err) return console.error(err.stack)
				
				console.log("pin is added")
				});

				var washer = new Product({
	  
					name: "Washer",
					details: "Washer details",
					image:"images/washer.png",
					company: astm._id
					});
			
					blot.save(function (err) {
					if(err) return console.error(err.stack)
					
					console.log("washer is added")
					});
  });
  
  res.send("Done Initial Data!");
}

exports.findAll = (req, res) => {
	Company.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};