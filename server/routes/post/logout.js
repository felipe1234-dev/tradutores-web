exports.logout = (req, res) => {
    let err = false;
    let msg =  "Successfully logged out!";  
    let stat = 200;

    req.session.destroy(error => {
        err = true;
        msg = `Error logging out: ${error}`;
        stat = 500;
    });
    
    res.status(stat).send(msg);
}