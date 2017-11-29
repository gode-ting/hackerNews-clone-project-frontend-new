const router = require('express').Router();
const cnf = require('cnf');
const request = require('request');
const authenticate = require('../middleware/authenticate');

router.get('/', async (req, res) => {
	const allPosts = await loadPosts();
	const allPostsJson = JSON.parse(allPosts);
	const authenticated = authenticate.isUserAuthorized(req);
	console.log(authenticated);
	res.render('index', {
		title: 'HackerNewz | Gode ting',
		description: 'Gode ting Cphbusiness Denmark school project',
		allPosts: allPostsJson
	});
});

function loadPosts() {
	const backend = cnf.backend;
	const allPostsEndpoint = cnf.endpoints.allPosts;
	const endpoint = backend + allPostsEndpoint;
	const method = 'get';
	return new Promise((resolve, reject) => {
		request.get({
			uri: endpoint,
			method
		}, (err, res, posts) => {
			resolve(posts);
		});
	});
}

module.exports = router;