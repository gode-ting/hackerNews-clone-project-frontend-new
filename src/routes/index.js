const router = require('express').Router();
const cnf = require('cnf');
const request = require('request');

router.get('/', async (req, res) => {
	const allPosts = await loadPosts();
	const allPostsJson = JSON.parse(allPosts);
	console.log(allPostsJson);
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
	console.log(endpoint);
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