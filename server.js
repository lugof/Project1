// To begin, run npm init, and fill out the information
// To install the needed packages, run in the terminal
// npm install express --save
// npm install socket.io --save
// npm install twit -- save
require('dotenv').load();

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , io = require('socket.io').listen(server);

  app.use(express.static('public'))
  app.use("/public", express.static(__dirname + "/public"));

  server.listen(process.env.PORT || 5000);


// routing
app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});


watchList = ["sony", "canelo alvarez", "benito juarez", "katy perry","jay z"];
console.log("este es el console.log de arreglo 3 "+arr3);

 var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet.id_str);
    

  });
 });