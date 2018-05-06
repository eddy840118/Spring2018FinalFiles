var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameModel = new Schema({
    gamename: {type: String},
    publisher: {type: String},
    rating: {type: String},
});

module.exports= mongoose.model('user', userModel);