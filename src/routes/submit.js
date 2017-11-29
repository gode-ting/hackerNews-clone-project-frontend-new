const router = require('express').Router();
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
	const isUserAuthorized = authenticate.isUserAuthorized(req);

	if (!isUserAuthorized) {
		return authenticate.notAuthenticated(res);
	}

	res.render('submit', {
		title: '',
		description: ''
	});
});

module.exports = router;