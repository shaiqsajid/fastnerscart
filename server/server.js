const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const app =express();
const mongoose=require('mongoose');
require('dotenv').config();



mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE,(err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('DB connected...')
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const port=process.env.PORT||3002;



//routes
require('./routes/pro_item')(app)
require('./routes/pro_type')(app);
require('./routes/pro_brand')(app);
require('./routes/user')(app);


// Create a Server
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})