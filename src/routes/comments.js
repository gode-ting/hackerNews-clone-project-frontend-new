const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('comments', {
		title: '',
		description: ''
	});
});

module.exports = router;