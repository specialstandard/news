var express = require('express')
var app = express()
var logger = require('morgan');
var router = express.Router()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  name: String,
  title: String,
  //link: String,
  //upvotes: {type: Number, default: 0},
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})
var User = mongoose.model('User', UserSchema)
mongoose.connect('mongodb://localhost/news')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/posts', function(req, res, next) {
  User.find( function(err, data){
    if(err) { return next(err); }
    res.json(data);
  });
});

app.post('/api/post', function(req, res, next) {
  console.log(req.body)
  var thisPost = new User( req.body)
  thisPost.save( function(err, data){
    if(err) { return next(err); }
    res.json(data);
  });
});

app.post('/api/delete', function(req, res, next) {
  console.log(req.body)
  var thisPost = new User( req.body)
  thisPost.remove( function(err, data){
    if(err) { return next(err); }
    res.json(data);
  });
});

app.use(logger('dev'));
app.use('/', express.static(__dirname))
app.listen(80, function() { console.log('listening')})
