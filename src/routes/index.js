const router = require('express').Router();
const cnf = require('cnf');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
	const allPosts = await loadPosts();
	console.log('all posts: ', allPosts);
	res.render('index', {
		title: '',
		description: ''
	});
});

function loadPosts () {
	const backend = cnf.backend;
	const allPostsEndpoint = cnf.endpoints.allPosts;
	const endpoint = `${backend}/${allPostsEndpoint}`;
	const method = 'get';
	console.log(endpoint);
	return new Promise((resolve, reject) => {
		fetch(endpoint, {method})
			.then(resolve());
	});
}

module.exports = router;