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


/*var config = {
  apiKey: "AIzaSyCLELJ2XRqID1272eMpipcMnkGzOSNMQng",
  authDomain: "project-1-440ef.firebaseapp.com",
  databaseURL: "https://project-1-440ef.firebaseio.com",
  projectId: "project-1-440ef",
  storageBucket: "project-1-440ef.appspot.com",
  messagingSenderId: "869209601087"
};
firebase.initializeApp(config);
var database = firebase.database();


database.ref("searches").limitToLast(10).on("child_added", function (childSnapshot) {
  // Store everything into a variable.
  var searchTerm = childSnapshot.val().searchTerm;
watchList = ['Katy Perry', searchTerm ];

});
*/
watchList = ['Katy Perry', "eminem", "coldplay" ];

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