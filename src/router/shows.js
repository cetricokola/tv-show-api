module.exports = {
    createShow: (req, res) => {
        class Show {
            constructor(show_name, description, genre_id, time, actors, image) {
                this.show_name = show_name;
                this.genre_id = genre_id;
                this.time = time;
                this.description = description;
                this.actors = actors;
                this.image = image;
            }

            getShowName() {
                return this.show_name;
            }

            getGenreId() {
                return this.genre_id;
            }

            getTime() {
                return this.time;
            }

            getDescription() {
                return this.description;
            }

            getImage() {
                return this.image;

            }

            getActors() {
                return this.actors;
            }
        }

        let show = new Show(req.body.show_name, req.body.description, req.body.genre_id, req.body.time, req.body.actors, req.body.image);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `shows`(name, description, genre_id, time, actors, image, created_at) VALUES(?,?,?,?,?,?,?)";
        let values = [show.getShowName(), show.getDescription(), show.getGenreId(), show.getTime(), show.getActors(), show.getImage(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json({"status": true, "massage:": "Show created successfully"});
            }
        });
    },
    deleteShow: (req, res) => {
        class Show {
            constructor(id) {
                this.id = id;
            }

            getShowId() {
                return this.id;
            }
        }

        let show = new Show(req.params.id);
        let query = "DELETE FROM `shows` WHERE id =?";
        db.query(query, show.getShowId(), (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json("not deleted")
            } else {
                return res.json("deleted");
            }
        });

    },
    addActorsToShow: (req, res) => {
        class ShowActor {
            constructor(show_id, actor_id) {
                this.show_id = show_id;
                this.actor_id = actor_id;
            }

            getShowId() {
                return this.show_id;
            }

            getActorId() {
                return this.actor_id;
            }
        }

        let showActor = new ShowActor(req.params.id, req.body.actor_id);

        for (let i = 0; i < showActor.getActorId().length; i++) {
            let created_time = require('date-and-time').format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let query = "INSERT INTO `show_actors` (show_id, actor_id, created_at) VALUES(?,?,?)";
            let values = [showActor.getShowId(), showActor.getActorId()[i], created_time];
            db.query(query, values, (err, result) => {
                if (err) {
                    console.log(res.status(500).send(err));
                    return res.json({"status": false})
                }
            });
        }
        return res.json({"status": false, "meassage": "Actor(s) created successfully"});
    },
    createGenre: (req, res) => {
        class Genre {
            constructor(name) {
                this.name = name;
            }

            getName() {
                return this.name;
            }
        }

        let genre = new Genre(req.body.name);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `genres`(name, created_at) VALUES(?,?)";
        let values = [genre.getName(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json({"status": true, "message": "Show created successfully"});
            }
        });

    },
    createActors: (req, res) => {
        class Actor {
            constructor(name) {
                this.name = name;
            }

            getName() {
                return this.name;
            }
        }

        let actor = new Actor(req.body.name);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `actors`(name, created_at) VALUES(?,?)";
        let values = [actor.getName(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json({"status": true, "message": "Show created successfully"});
            }
        });
    },
    commentAShow: (req, res) => {
        class Comment {
            constructor(show_id, comment) {
                this.show_id = show_id;
                this.comment = comment;
            }

            getComment() {
                return this.comment;
            }

            getShowId() {
                return this.show_id;
            }

        }

        let comment = new Comment(req.params.id, req.body.comment);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `comment_shows`(show_id, user_id, comment, created_at) VALUES(?,?,?,?)";
        let values = [comment.getShowId(), req.session.user.id, comment.getComment(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json({"status": true, "message": "Show commented"});
            }
        });
    },
    rateAshow: (req, res) => {
        class Rating {
            constructor(show_id, user_id, rating) {
                this.show_id = show_id;
                this.rating = rating;
                this.user_id = user_id;
            }

            getRating() {
                return this.rating;
            }

            getShowId() {
                return this.show_id;
            }

            getUserId() {
                return this.user_id;
            }
        }

        let rating = new Rating(req.params.id, req.session.user.id, req.body.rate);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `ratings`(show_id, user_id, rating, created_at) VALUES(?,?,?, ?)";
        let values = [rating.getShowId(), rating.getUserId(), rating.getRating(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json({"status": true, "message": "You have rated this show"});
            }
        });

    },
    subscribeToAShow: (req, res) => {
        class Subscription {
            constructor(user_id, show_id) {
                this.show_id = show_id;
                this.user_id = user_id;
            }

            getShowId() {
                return this.show_id;
            }

            getUserId() {
                return this.user_id;
            }
        }

        let subscription = new Subscription(req.session.user.id, req.params.id);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `subscriptions`(user_id, show_id, created_at) VALUES(?,?,?)";
        let values = [subscription.getUserId(), subscription.getShowId(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json("You have subscribed to this show");
            }
        });
    },
    //manage your subscriptions
    viewSubscription: (req, res) => {
        class subscription {
            constructor(user_id) {
                this.user_id = user_id;
            }

            getUserId() {
                return this.user_id;
            }
        }

        let query = "SELECT subscriptions.id as subscriptions_id, subscriptions.show_id as show_id, shows.name as show_name, user_accounts.email as email FROM  subscriptions JOIN shows on subscriptions.show_id = shows.id JOIN user_accounts ON  user_accounts.id = subscriptions.user_id";
        db.query(query, function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json("error")
            }
            return res.json(results)
        });
    },
    unsubscribeSubscription: (req, res) => {
        let query = "DELETE FROM subscriptions WHERE id =? ";
        db.query(query, req.params.id, function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json("not")
            }
            return res.json("deleted");
        });
    },
    viewShows: (req, res) => {
        let query = "SELECT shows.id, shows.name, shows.description, shows.actors, shows.image, shows.time, genres.name as genre FROM shows, genres where shows.genre_id = genres.id";
        db.query(query, (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json({"status": false})
            } else {
                return res.json(result);
            }
        });
    },
    selectShow: (req, res) => {
        let query = "SELECT shows.id, shows.name, shows.description, shows.actors, shows.image, shows.time, genres.name as genre, genres.id as genre_id FROM shows, genres where shows.genre_id = genres.id and shows.id =?";
        db.query(query, [req.params.id], (err, result) => {
            if (err) {
                console.log(res.status(500).send(err));
                return res.json("no shows")
            } else {
                return res.json("shows");
            }
        });
    },
    viewComments: (req, res) => {
        class Comments {
            constructor(show_id) {
                this.show_id = show_id
            }

            getShowId() {
                return this.show_id;
            }
        }

        let comments = new Comments(req.params.id);
        let query = "SELECT comment_shows.id as comment_id, comment_shows.comment as comment, user_accounts.username as username FROM  comment_shows JOIN user_accounts on comment_shows.user_id = user_accounts.id WHERE show_id =?";
        db.query(query, comments.getShowId(), function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json("no comment")
            }
            return res.json(results)
        });
    },
    viewRatings: (req, res) => {
        let sum = 0;

        class Ratings {
            constructor(show_id) {
                this.show_id = show_id;
            }

            getShowId() {
                return this.show_id;
            }
        }

        let ratings = new Ratings(req.params.id);
        let query = "SELECT ratings.rating FROM  ratings WHERE show_id =?";
        db.query(query, ratings.getShowId(), function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json({"status": false})
            }
            for (let i = 0; i < results.length; i++) {
                let rate = parseInt(results[i].rating, 10);
                sum = +rate
            }
            return res.json({"status": true, "rating": sum})
        });
    },
    viewActors: (req, res) => {
        class Actor {
            constructor(show_id) {
                this.show_id = show_id;
            }

            getShowId() {
                return this.show_id;
            }
        }

        let actor = new Actor(req.params.show_id);
        let query = "SELECT actors.name FROM  actors, shows, show_actors WHERE show_actors.actor_id = actors.id AND shows.id = show_actors.show_id";
        db.query(query, actor.getShowId(), function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json({"status": false})
            }
            return res.json(results)
        });
    },
    viewGenres: (req, res) => {
        let query = "SELECT * FROM  genres";
        db.query(query, function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json({"status": false})
            }
            return res.json(results)
        });
    },
    viewMySubscription: (req, res) => {
        let query = "SELECT subscriptions.id, subscriptions.show_id, shows.name FROM  subscriptions JOIN shows on subscriptions.show_id = shows.id WHERE user_id =?";
        db.query(query, req.session.user.id, function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json("no subscription")
            }
            return res.json(results)
        });
    },
    updateShow: (req, res) => {
        let query = "UPDATE shows SET name=? , description =?, genre_id = ?, time=?, actors=?, image=? WHERE id = ? ";
        db.query(query, [req.body.name, req.body.description, req.body.time, req.body.genre_id, req.body.time, req.body.actors, req.body.image, req.params.id], function (error, results) {
            if (error) {
                console.log(res.status(500).send(error));
                return res.json("no update")
            }
            console.log(req.body.description)
            return res.json("updated")
        });

    }
}
