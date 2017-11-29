/* globals loadAllPosts */

(function () {

	window.onload = function () {

		var indexRegex = /^\/$/;

		// router
		var Router = {
			routes: {
				'/': function () {
					Router.makeCurrent('index');
				},
				'/new': function () {
					Router.makeCurrent('new');
				},
				'/comments': function () {
					Router.makeCurrent('comments');
				},
				'/show': function () {
					Router.makeCurrent('show');
				},
				'/ask': function () {
					Router.makeCurrent('ask');
				},
				'/jobs': function () {
					Router.makeCurrent('jobs');
				},
				'/submit': function () {
					Router.makeCurrent('submit');
				}
			},
			nav: function () {
				var route = window.location.pathname;
				if (route !== '/') {
					route = route.replace(/\/$/, '');
				}
				// Do not do it on login page
				if (!/login/.test(route) && !/item/.test(route) && !/user/.test(route) && !indexRegex.test(route)) {
					this.routes[route].apply();
				}
			},
			makeCurrent: function (item) {
				document.getElementById(`top-nav__link-${item}`).classList.add('active');

			}
		};

		Router.nav();
		document.getElementsByClassName('top-nav__link').onclick = Router.nav();

		function logoutUser() {
			deleteCookie('token');
			deleteCookie('username');
			// window.location = '/';
		}
	};
})();

function setCookie(cookieName, cookieValue, cookieExpDays) {
	var date = new Date();
	date.setTime(date.getTime() + (cookieExpDays * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + date.toUTCString();
	document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

function getCookie(cookieName) {
	var name = cookieName + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return false;
}

function deleteCookie(cookiename) {
	document.cookie = cookiename + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}