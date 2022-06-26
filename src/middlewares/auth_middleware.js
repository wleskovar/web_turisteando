function auth_middleware(req, res, next) {
	if (!req.session.user_logged) {
	    return res.redirect("/users/login");
    }
	next();
}

module.exports = auth_middleware;