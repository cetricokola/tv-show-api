module.exports = {

    register: (req, res) => {
        const date = require('date-and-time');
        const now = new Date();
        let time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        var passwordHash = require('password-hash');
        var password = passwordHash.generate(req.body.password);
        let query = "INSERT INTO `user_accounts`(username, email, password, created_at) VALUES(?, ?, ?, ?)";
        let values = [req.body.username, req.body.email, password, time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false, "message": "Unable to create account try again."});
            } else {
                let sess = req.session;
                sess.username = req.body.username;
                return res.json({"status": true, "message": "Account created successfully"});
            }
        });
    },
    signin: (req, res) => {
        let query = "SELECT * FROM user_accounts WHERE username = ?";
        db.query(query, [req.body.username], (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false, "message": "Unable to create account try again."});
            }
            let pass = result[0].password;
            let passwordHash = require('password-hash');
            if (passwordHash.verify(req.body.password, pass) === true) {
                req.session.user = result[0].id;
                return res.json({"status": true, "message": "Successful log in", "session": req.session.user});
            } else {

                return res.json({"status": false, "message": "Incorrect password"});
            }
        });
    }
};
