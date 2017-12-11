// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cnf = require('cnf');
const sass = require('node-sass-middleware');
const atob = require('atob');
const path = require('path');

// Routes
const commentsRoute = require('./routes/comments');
const indexRoute = require('./routes/index');
const itemRoute = require('./routes/item');
const loginRoute = require('./routes/login');
const submitRoute = require('./routes/submit');
const userRoute = require('./routes/user');
const backendAuth = require('./backend/auth');
const backendSubmit = require('./backend/submit');

async function main() {

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
	app.set('views', path.join(__dirname, '..', 'views'));
	app.set('view engine', 'pug');
	app.use((req, res, next) => {
		const tokenCookie = req.cookies.token;
		if (tokenCookie) {
			res.locals.authenticated = true;
			next();
		} else {
			res.locals.authenticated = false;
			next();
		}
	});
	app.use('*', (req, res, next) => {
		setUsernameCookie(req, res);
		next();
	});

	// Load routes
	app.use('/', indexRoute);
	app.use('/comments', commentsRoute);
	app.use('/login', loginRoute);
	app.use('/item', itemRoute);
	app.use('/submit', submitRoute);
	app.use('/user', userRoute);
	app.use('/auth', backendAuth);
	app.use('/make-submit', backendSubmit);

	const port = process.env.PORT || cnf.http.port;

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

function setUsernameCookie(req, res, next) {
	const tokenCookie = req.cookies.token;
	if (tokenCookie) {
		const tokenFilteredBearer = tokenCookie.split(' ').pop();
		const encodedUsernameObject = tokenFilteredBearer.split('.')[1];
		const decodedUsernameObject = atob(encodedUsernameObject);
		const username = JSON.parse(decodedUsernameObject).username;
		const oneDayExpire = 1 * 24 * 60 * 60 * 1000;
		res.cookie('username', username, { maxAge: oneDayExpire });
	}
	return;
}

module.exports = {
	main
};