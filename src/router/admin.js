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
                let sess = req.session;
                sess.email = email;
                return res.json({"status": true, "message": "Account created successfully"});
            }
        });
    },
    login: (req, res) => {
        let query = "SELECT * FROM admins WHERE email = ?";
        let email = req.body.email;
        db.query(query, [email], (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false, "message": "Unable to login try again."});
            }
            let pass = result[0].password;
            let passwordHash = require('password-hash');
            if (passwordHash.verify(req.body.password, pass) === true) {
                let sess = req.session;
                sess.email = email;
                return res.json({"status": true, "message": "Successful log in"});
            } else {
                return res.json({"status": false, "message": "Incorrect password"});
            }
        });
    }
};
