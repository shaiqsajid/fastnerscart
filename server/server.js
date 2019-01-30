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

// // Connecting to the database
// mongoose.connect(process.env.DATABASE)
// .then(() => {
//     console.log("Successfully connected to MongoDB.");    
// }).catch(err => {
//     console.log('Could not connect to MongoDB.');
//     process.exit();
// });

//routes
require('./routes/subproducts')(app)
require('./routes/products')(app);
require('./routes/companies')(app);
require('./routes/user')(app);

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

   // findArgs['publish'] = true;

    Product.
    //find(findArgs).
    find(findArgs)
    populate('brand').
    //populate('wood').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})
// Create a Server
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})