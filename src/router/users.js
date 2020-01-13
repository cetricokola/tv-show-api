module.exports = {

    register: (req, res) => {
        const shortid = require('shortid');
        const date = require('date-and-time');
        const now = new Date();
        let time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        var passwordHash = require('password-hash');
        var password = passwordHash.generate(req.body.password);
        let query = "INSERT INTO `user_accounts`(user_id, username, email, password, created_at) VALUES(?, ?, ?, ?, ?)";
        let values = [shortid.generate(), req.body.username, req.body.email, password, time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json("Account created successfully");
            }
        });
    },
    signin: (req, res) => {
        let query = "SELECT * FROM user_accounts WHERE username = ?";
        db.query(query, [req.body.username], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            let pass = result[0].password;
            let passwordHash = require('password-hash');
            if (passwordHash.verify(req.body.password, pass) === true) {
                return res.json("Successful log in");
            } else {
                return res.json("Incorrect password");
            }
        });
    }
};
