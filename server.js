var express = require('express')
var app = express()
var logger = require('morgan');
var router = express.Router()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cheerio = require('cheerio')
var request = require('request');

var UserSchema = new mongoose.Schema({
  name: String,
  title: String,
  //link: String,
  //upvotes: {type: Number, default: 0},
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})
var User = mongoose.model('User', UserSchema)
mongoose.connect('mongodb://52.40.114.1/abc')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

var movieUrl = 'https://thepiratebay.org/browse/201/0/7/0'
//returns list of movies
var movieList = []
app.get('/api/movies', function(req, res, next) {

  request(movieUrl, function(err, response, html){
    if(!err){
      //console.log(html)
      var $ = cheerio.load(html)
      var list = $('.detLink')

      movieList = JSON.stringify(list.toArray(), function (k, v) {
        if (k === "prev" || k === "next" || k === "parent") return undefined;
        return v;
      })
      console.log(movieList)
      res.send(movieList)
    }
  })


})

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
app.listen(3001, function() { console.log('listening')})
