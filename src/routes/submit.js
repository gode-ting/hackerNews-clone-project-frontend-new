const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('submit', {
		title: '',
		description: ''
	});
});

module.exports = router;