function login_middleware (req, res, next) {
	if (req.session.user_logged !== undefined) {
	next();
	}else{
	 res.redirect("/users/login");
	}
	
}

module.exports = login_middleware;