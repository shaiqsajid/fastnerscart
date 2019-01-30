module.exports = function(app){
    
    var user=require('../controllers/user');

    app.post('/api/users/login',user.userLogin);
    app.post('/api/users/register',user.userRegister);	
};
