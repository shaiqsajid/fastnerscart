const {User}=require('../models/user');

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