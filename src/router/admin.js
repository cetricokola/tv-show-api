module.exports = {

    createAccount: (req, res) => {
        const date = require('date-and-time');
        const now = new Date();
        let time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let email = req.body.email;
        let passwordHash = require('password-hash');
        let password = passwordHash.generate(req.body.password);
        let query = "INSERT INTO `admins`(email, password, created_at) VALUES(?, ?, ?)";
        let values = [email, password, time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false, "message": "Unable to create account try again."});
            } else {

                return res.json({"status": true, "message": "Account created successfully"});
            }
        });
    },
    login: (req, res) => {
        let query = "SELECT * FROM admins WHERE email = ?";
        db.query(query, [req.body.email], (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false, "message": "Unable to login try again."});
            }
            console.log(req.body.email);
            let pass = result[0].password;
            let passwordHash = require('password-hash');
            if (passwordHash.verify(req.body.password, pass) === true) {
                req.session.email = result[0].email;
                // res.cookie('id', req.session.email, {maxAge: 900000, httpOnly: true});
                return res.json({"status": true, "message": "Successful log in", "session": req.session.email});
            } else {
                return res.json({"status": false, "message": "Incorrect password"});
            }
        });
    },
    logout: (req, res) =>{
        req.session.destroy();
        res.clearCookie('user');
        res.clearCookie('email');
    }
};
