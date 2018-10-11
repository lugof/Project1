


var Twitter = require('twitter');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var url = require('url');

server.listen(8080);


app.get('/', function (req, res) {
  
  //res.sendfile(__dirname + '/index.html'); 
  res.send({
    data:"hola"
  })
});
app.get('/search', function (req, res) {
  console.log("this is the req.url ", req.url);
  var urlParts = url.parse(req.url, true);
  
  var query = urlParts.query;
  console.log("this is url parts query ",query.term);
  //res.sendfile(__dirname + '/index.html'); 
  var client = new Twitter({
    consumer_key: "49rhaSo53IrKfgEKbV6y6dGwq",
    consumer_secret: "tBNq92hjZx4jjOrll9V8pl99rgLN3hKHlv3Ew3afVHF1FMixGO",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAMl78gAAAAAAf%2FNmgjfbLTPHAqdVv%2Bokl7A8%2BmE%3DYqqtgBOUJsQ7aqnntg2HfHP9VStvr5YukzGe7fmD7GKvbTw9Qh"
  });
  
  var params = {screen_name: query.term};
  return client.get('statuses/user_timeline', params).then(function(data){
   
    console.log("data ", data);
    return res.json(data); 

  }).catch(function(error){
    return res.json(error)
  })


});
/*
    var Twitter = require('twitter');
    
    var client = new Twitter({
      consumer_key: "49rhaSo53IrKfgEKbV6y6dGwq",
      consumer_secret: "tBNq92hjZx4jjOrll9V8pl99rgLN3hKHlv3Ew3afVHF1FMixGO",
      bearer_token: "AAAAAAAAAAAAAAAAAAAAAMl78gAAAAAAf%2FNmgjfbLTPHAqdVv%2Bokl7A8%2BmE%3DYqqtgBOUJsQ7aqnntg2HfHP9VStvr5YukzGe7fmD7GKvbTw9Qh"
    });
    
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        console.log(response);
      }
    });


    */