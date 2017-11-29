function isUserAuthorized (req) {
	const tokenCookie = req.cookies.token;
	return tokenCookie !== undefined;
}

function notAuthenticated (res) {
	res.render('unauthorized', {});
}

module.exports = {
	isUserAuthorized,
	notAuthenticated
};