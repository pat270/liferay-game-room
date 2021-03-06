var express = require('express')

var http = require('http');

var app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var ss = require('socket.io-stream');

var path = require('path');

var fs = require('fs');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/user/index.html');
});

app.get('/gameroom', function(req, res) {
	res.sendFile(__dirname + '/gameroom/index.html');
});

io.on('connection', function(socket){
	socket.on('user-request', function(data){
		socket.broadcast.emit('user-request');
	});

	ss(socket).on('image', function(stream, data) {
		socket.broadcast.emit('update-room', data);
	});
});

app.use(express.static('public'));

server.listen(80, function () {
	console.log('Liferay Game Room on 80');
});