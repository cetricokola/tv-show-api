module.exports = {

    createAccount: (req, res) => {
        const shortid = require('shortid');
        const date = require('date-and-time');
        const now = new Date();
        var time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        var id = shortid.generate();
        var email = req.body.email;
        var passwordHash = require('password-hash');
        var password = passwordHash.generate(req.body.password);
        let query = "INSERT INTO `admins`(account_id, email, password, created_at) VALUES(?, ?, ?, ?)";
        let values = [id, email, password, time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json("Account created successfully");
            }
        });
    },
    login: (req, res) => {
        let query = "SELECT * FROM admins WHERE email = ?";
        db.query(query, [req.body.email], (err, result) => {
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
