const router = require('express').Router();
const cnf = require('cnf');
const request = require('request');

router.get('', async (req, res) => {
	const username = req.query.username;
	console.log('username: ', username);

	const userProfile = await getUserProfile(username);
	const userProfileJson = JSON.parse(userProfile);

	const userKarma = userProfileJson.hasOwnProperty('karma') ? userProfileJson.karma: '';
	const userCreated = userProfileJson.createdAt || '';

	console.log('User karma: ', userKarma);
	console.log('User created: ', userCreated);

	res.render('user', {
		title: 'HackerNewz | Gode ting',
		description: 'Gode ting Cphbusiness Denmark school project',
		username,
		userKarma,
		userCreated
	});
});

async function getUserProfile(username) {
	const backend = cnf.backend;
	const userEndpoint = cnf.endpoints.user;
	const endpoint = backend + userEndpoint + username;
	console.log('Endpoint: ', endpoint);
	console.log('Loading user profile');
	return new Promise((resolve, reject) => {
		request(endpoint, (error, response, body) => {
			if (error){
				reject(error);
			}
			// console.log('Response: ', response);
			console.log('Body: ', body);
			resolve(body);
		});
	});
}

module.exports = router;