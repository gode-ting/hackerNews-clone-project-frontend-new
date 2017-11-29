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
	};
})();