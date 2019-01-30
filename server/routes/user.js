module.exports = function(app){
    // Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
    var user=require('../controllers/user');

    app.post('/api/users/login',user.userLogin);
    app.post('/api/users/register',user.userRegister);	
    app.get('/api/users/auth',auth,user.userAuth);
    app.get('/api/users/logout',auth,user.userLogout);
};
