var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');


app.use(express.static('public'));

app.use(session({
	secret: 'app',
	resave: false,
	saveUninitialized: true,
}));

app.use(bodyParser.json());


app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/users/:userId', function(request, response) {
	if (!request.session.user) {
		request.session.user = {
			first_name: 'Looong',
			last_name: 'Dongy',
		};
	}
	response.send(request.session.user);
});

app.post('/users/:userId', function(request, response) {
	setTimeout(function() {
		if (Math.random() > 0.5) {
			var required = ['first_name', 'last_name'];
			var errors = required.filter(function(r) {
				return !(r in request.body && request.body[r].length);
			});
			if (errors.length) {
				response.status(400).send({
					message: 'Invalid parameters',
					fields: errors,
				});
			} else {
				request.session.user = request.body;
				response.send(request.session.user);
			}
		} else {
			response.status(500).send({});
		}
	}, Math.random() * 1000);
});


http.listen(1337);

