const {User}=require('../models/user');
const cloudinary = require('cloudinary');
const mongoose=require('mongoose');
const ProItem=require('../models/pro_item');
const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
// const mongoose = require( 'mongoose' );
// const User = require( '../../models/User' );

const Insta = require('instamojo-nodejs');
const url = require('url');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.removeFromCart=(req,res)=>{
    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
            { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            ProItem.
            find({'_id':{ $in: array }}).
            populate('pro_type').
            populate('pro_brand').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
};
exports.userLogin=(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:"Auth failed, email is wrong"});
       user.comparePassword(req.body.password,(err,isMatched)=>{
           if(!isMatched) return res.json({loginSuccess:false,message:"password is wrong"});
           user.createToken((err,user)=>{
               if(err) return res.status(400).send(err);
               res.cookie('w_auth',user.token).status(200).json({loginSuccess:true});
           });
       }); 
    });
};


exports.uploadImage=(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
};
exports.callback=(req,res)=>{
    let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;

        console.log(responseData);

	if ( responseData.payment_id ) {
		let userId = responseData.user_id;

		// Save the info that user has purchased the bid.
		const bidData = {};
		bidData.package = 'Bid100';
		bidData.bidCountInPack = '10';

		// User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
		// 	.then( ( user ) => res.json( user ) )
		// 	.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
		return res.redirect('http://localhost:3000/payment-complete' );
	}
};
exports.payment=(req,res)=>{
    Insta.setKeys('test_667e5dc93b12c357457795f9e12', 'test_81119370324008140be9dbc9f11');

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  req.body.buyer_name;
	data.redirect_url =  req.body.redirect_url;
	data.email =  req.body.email;
	data.phone =  req.body.phone;
	data.send_email =  false;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
            const responseData = JSON.parse( response );
            console.log(responseData);
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json( redirectUrl );
		}
	});
};
exports.addToCart=(req,res)=>{
    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                  duplicate = true;  
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date: Date.now()
                } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
};
exports.successBuy=(req,res)=>{
    let history = [];
    let transactionData = {}

    // user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
        
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history:history }, $set:{ cart:[] } },
        { new: true },
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id,quantity:item.quantity})
                 })
              
                async.eachSeries(products,(item,callback)=>{ 
                    Product.update(
                        {_id: item.id},
                        { $inc:{
                            "sold": item.quantity
                        }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
};
exports.removeImage=(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({succes:false,error});
        res.status(200).send('ok');
    })
};



exports.userAuth=(req,res)=>{
        res.status(200).json({
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            cart: req.user.cart,
            history: req.user.history
        })

};

exports.userLogout=(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
}
exports.userRegister=(req,res)=>{
    const user= new User(req.body);
    
    user.save((err,doc)=>{
       
        if(err) return res.json({success: false, err});
        res.status(200).json({success:true,
           //userdata:doc
           //userdata:doc.name
           
        });
    });  
};