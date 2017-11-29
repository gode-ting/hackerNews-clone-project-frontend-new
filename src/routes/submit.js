const router = require('express').Router();
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
	const usernameCookie = req.cookies['username'];
	const tokenCookie = req.cookies['token'];

	if (!usernameCookie && !tokenCookie) {
		res.render('unauthorized', { title: '', description: '' });
	}
	res.render('submit', {
		title: '',
		description: ''
	});
});

module.exports = router;