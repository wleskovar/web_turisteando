const User = require('../model/Users.js')

function user_logged_middleware(req, res, next) {
    res.locals.is_logged = false;

    let email_in_cookie = req.cookies.user_email;
    let user_from_cookie = User.find_by_field('email', email_in_cookie);

    if (user_from_cookie) {
        req.session.user_logged = user_from_cookie;
    }

    if (req.session.user_logged) {
        res.locals.is_logged = true;
        res.locals.user_logged = req.session.user_logged;
    }


 
    next();
}

module.exports = user_logged_middleware;