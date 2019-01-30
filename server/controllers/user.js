const {User}=require('../models/user');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
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