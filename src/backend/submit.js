const router = require('express').Router();
const request = require('request');
const cnf = require('cnf');

router.post('/', async (req, res) => {
	console.log('Make submit!');
	const postTitle = req.body.title || null;
	const postUrl = req.body.url || null;
	const postText = req.body.text || null;
	const username = req.cookies.username;
	const token = req.cookies.token;

	const postSubmitted = await attemptSubmit({ postTitle, postUrl, postText, username, token });
	console.log('submitted: ', postSubmitted);
	res.redirect('/submit');
});

function attemptSubmit({ postTitle, postUrl, postText, username, token }) {
	const postType = 'story';
	const postParent = '';

	const backend = cnf.backend;
	const submitEndpoint = cnf.endpoints.submit;
	const endpoint = backend + submitEndpoint;

	return new Promise((resolve, reject) => {
		const body = JSON.stringify({
			postTitle,
			postUrl,
			postText,
			username,
			postType,
			postParent
		});

		request.post({
			uri: endpoint,
			body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		}, (err, res, submit) => {
			if (err) {
				reject(err);
			}
			console.log(res);
			console.log('\n\nSubmit: ', submit);
			resolve();
		});
	});
}

module.exports = router;