const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

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
	  
	  console.log("blot is added")
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