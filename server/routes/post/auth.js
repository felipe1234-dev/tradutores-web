exports.authenticate = (req, res) => {
    const { loggedIn, user, theme } = req.session;
    
    res.json({
        loggedIn: loggedIn ? true : false,
        theme: theme,
        user: loggedIn ? user.public : {}
    });
}