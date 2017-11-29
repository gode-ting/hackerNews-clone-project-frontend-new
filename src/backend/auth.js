const router = require('express').Router();
const cnf = require('cnf');
const request = require('request');

router.post('/signup', async (req, res) => {

	const username = req.body.username;
	const password = req.body.password;

	const signedUp = await attemptSignup(username, password);
	console.log('signed up? ', signedUp);
	res.render('login', { signupSuccess: 'Successfully signed up!' });
});

router.post('/login', async (req, res) => {

	const username = req.body.username;
	const password = req.body.password;

	const loggedIn = await attemtLogin(username, password);
	const tokenCookieName = 'token';
	const tokenCookieValue = loggedIn.authorization;
	const oneDayExpire = 1 * 24 * 60 * 60 * 1000;

	res.cookie(tokenCookieName, tokenCookieValue, { maxAge: oneDayExpire });
	res.redirect('/');
});

function attemptSignup(username, password) {
	return new Promise((resolve, reject) => {
		const backend = cnf.backend;
		const signupEndpoint = cnf.endpoints.signup;
		const endpoint = backend + signupEndpoint;

		const body = JSON.stringify({
			username,
			password
		});

		request.post({
			uri: endpoint,
			body,
			headers: {
				'content-type': 'application/json'
			}
		}, (err, res, signedUp) => {
			if (err) {
				reject(err);
			}
			resolve(signedUp);
		});
	});
}

function attemtLogin(username, password) {
	return new Promise((resolve, reject) => {
		const backend = cnf.backend;
		const loginEndpoint = cnf.endpoints.login;
		const endpoint = backend + loginEndpoint;

		const body = JSON.stringify({
			username, password
		});

		request.post({
			uri: endpoint,
			body,
			headers: {
				'access-control-allow-headers': 'Authorization'
			}
		}, (err, res) => {
			if (err) {
				reject(err);
			}
			const headers = res.headers;
			resolve(headers);
		});
	});
}

module.exports = router;