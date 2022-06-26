function guest_middleware(req, res, next) {
	if (req.session.user_logged) {
	    return res.redirect("../users/profile");
    }
	next();
}

module.exports = guest_middleware;