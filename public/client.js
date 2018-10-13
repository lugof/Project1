



$(function(){
  var socket = io.connect();
  socket.on('stream', function(tweet) {
    console.log("agregando a arreglo  n veces");
    
    
  // $('body').append('<div class="tweet">' + tweet + '</div>')
   arr2.push(tweet);
  
  
    
});
});
  



 