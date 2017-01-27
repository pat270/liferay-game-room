var express = require('express')

var http = require('http');

var app = express();
var device = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/camera-example/index.html');
});

device.get('/', function (req, res) {
	console.log(device.mountpath);
	res.send('Device Page');
});

io.on('connection', function(socket){
  console.log('a user connected');
	socket.on('test', function(data){
		console.log(data);
	});
});

app.use('/device', device);

app.use(express.static('public'));

server.listen(9000, function () {
  console.log('Liferay Game Room on 9000');
});