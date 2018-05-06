var express = require('express');
    mongoose = require('mongoose');
    bodyParser = require    ('body-parser');

var db = mongoose.connect('mongodb://localhost/gametracker');


var app = express();

var port = process.env.PORT || 3000;

// cors
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// mount book endpoints
var Book = require('./models/bookModel');
bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

// mount user endpoints
var User = require('./models/userModel');
userRouter = require('./Routes/userRoutes')(User);
console.log('userRoutes', userRouter);
app.use('/api/users', userRouter);


app.get('/', function(reg, res){
    res.send('welcome to my API');
});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT: ' + port);
});