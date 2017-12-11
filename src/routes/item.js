const router = require('express').Router();
const cnf = require('cnf');
const request = require('request');

router.get('/', async (req, res) => {
	const id = req.query.id;

	const currentItem = await getCurrentItem(id);
	console.log('current item: ', currentItem);
	res.render('item', {
		title: 'HackerNewz | Gode ting',
		description: 'Gode ting Cphbusiness Denmark school project'
	});
});

async function getCurrentItem(id) {
	const backend = cnf.backend;
	const itemEndpoint = cnf.endpoints.item;
	const endpoint = backend + itemEndpoint + id;

	console.log('Endpoint: ', endpoint);

	return new Promise((resolve, reject) => {
		request({
			url: endpoint,
			headers: {
				'Content-Type': 'application/json'
			}
		}, (error, response, body) => {
			if (error) {
				reject(error);
			}
			console.log('response: ', response);
			console.log('Body: ', body);
			resolve();
		});
	});
}

module.exports = router;