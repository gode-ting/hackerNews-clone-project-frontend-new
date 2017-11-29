// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cnf = require('cnf');
const sass = require('node-sass-middleware');

// Routes
const comments = require('./routes/comments');
const index = require('./routes/index');
const login = require('./routes/login');
const submit = require('./routes/submit');
const backendAuth = require('./backend/auth');

async function main() {
	console.log('Main!');

	const app = express();

	// Load middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(
		sass({
			src: 'public',
			response: true,
			outputStyle: 'compressed',
			debug: false
		})
	);
	app.use(express.static('public'));
	app.set('views', 'views');
	app.set('view engine', 'pug');

	// Load routes
	app.use('/', index);
	app.use('/comments', comments);
	app.use('/login', login);
	app.use('/submit', submit);
	app.use('/auth', backendAuth);

	const port = cnf.http.port;

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

module.exports = {
	main
};