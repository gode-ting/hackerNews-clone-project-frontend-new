const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('login', {
		title: '',
		description: ''
	});
});

module.exports = router;