function huesped_middleware(req, res, next) {
	if (req.session.login_user == undefined) {
	next();
	}else{
		res.redirect("../views/users/profile")
	}
	
}

module.exports = huesped_middleware;