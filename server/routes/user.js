module.exports = function(app){
    // Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const formidable = require('express-formidable');

    var user=require('../controllers/user');

    app.post('/api/users/login',user.userLogin);
    app.post('/api/users/register',user.userRegister);	
    app.get('/api/users/auth',auth,user.userAuth);
    app.get('/api/users/logout',auth,user.userLogout);
    app.post('/api/users/uploadimage',auth,admin,formidable(),user.uploadImage);
    app.get('/api/users/removeimage',auth,admin,user.removeImage);
    app.post('/api/users/addToCart',auth,user.addToCart);
};
