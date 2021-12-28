var express = require('express');
var bodyParser = require('body-parser'); //formats incoming data so it easy to read
var Pusher = require('pusher');



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.get('/',function(req,res){
//     res.sendFile('/public/index.html', {root: __dirname });
//});

//app.use(express.static(__dirname + '/public'));

//var port = process.env.PORT || 5000;
//app.listen(port, function () {
//  console.log(`app listening on port ${port}!`)
//});

//------------ADDED FOR CHAT---------//

//END FOR CHAT APP


// to serve our JavaScript, CSS and index.html
app.use(express.static('./'));

var pusher = new Pusher({
  appId: '1292953',
  key: '41ee7bfae92a5d90b05a',
  secret:  '0197a886e1bfef6a0567'

});



//------------ADDED FOR CHAT---------//


//------------ADDED FOR CHAT---------//


app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

//---FOR CHAT APP
//------------ADDED FOR CHAT---------//

app.post('/message', function(req, res) {
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { message: message });
  res.sendStatus(200);
});

//app.get('/',function(req,res){
//     res.sendFile('/public/index.html', {root: __dirname });
//});

var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening at http://localhost:5000'));
