module.exports = {
    createShow: (req, res) => {
        class Show {
            constructor(show_name, description, genre_id, time) {
                this.show_name = show_name;
                this.genre_id = genre_id;
                this.time = time;
                this.description = description
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
        }

        let show = new Show(req.body.show_name, req.body.description, req.body.genre_id, req.body.time);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `shows`(name, description, genre_id, time, created_at) VALUES(?,?,?,?,?)";
        let values = [show.getShowName(), show.getDescription(), show.getGenreId(), show.getTime(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json("Show created successfully");
            }
        });
    },
    editShow: (req, res) => {

    },
    deleteShow: (req, res) => {

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

        let showActor = new ShowActor(req.body.show_id, req.body.actor_id);

        for (let i = 0; i < showActor.getActorId().length; i++) {
            let created_time = require('date-and-time').format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let query = "INSERT INTO `show_actors` (show_id, actor_id, created_at) VALUES(?,?,?)";
            let values = [showActor.getShowId(), showActor.getActorId()[i], created_time];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.log("Error:", err);
                    return res.status(500).send(err);
                }
            });
        }
        console.log("Success:");
        return res.json("Actor(s) created successfully");
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
                return res.status(500).send(err);
            } else {
                return res.json("Genre created successfully");
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
                return res.status(500).send(err);
            } else {
                return res.json("Actor created successfully");
            }
        });
    },
    commentAShow: (req, res) => {
        class Comment {
            constructor(show_id, user_id, comment) {
                this.show_id = show_id;
                this.comment = comment;
                this.user_id = user_id;
            }

            getComment() {
                return this.comment;
            }

            getShowId() {
                return this.show_id;
            }

            getUserId() {
                return this.user_id;
            }
        }

        let comment = new Comment(req.body.show_id, req.body.user_id, req.body.comment);
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `comment_shows`(show_id, user_id, comment, created_at) VALUES(?,?,?,?)";
        let values = [comment.getShowId(), comment.getUserId(), comment.getComment(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json("Show commented");
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

        let rating = new Rating(req.body.show_id, req.body.user_id, req.body.rate);
        const shortid = require('shortid');
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `ratings`(id, show_id, user_id, rating, created_at) VALUES(?, ?,?,?, ?)";
        let values = [shortid.generate(), rating.getShowId(), rating.getUserId(), rating.getRating(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json("You have rated this show");
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

        let subscription = new Subscription(req.body.user_id, req.body.show_id);
        const shortid = require('shortid');
        const date = require('date-and-time');
        const now = new Date();
        let created_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let query = "INSERT INTO `subscriptions`(id, user_id, show_id, created_at) VALUES(?, ?,?,?)";
        let values = [shortid.generate(), subscription.getUserId(), subscription.getShowId(), created_time];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
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

        let userId = "0mHSujZM"; //value from the session
        let mysubscription = new subscription(userId);
        let query = "SELECT subscriptions.id as subscriptions_id, subscriptions.show_id as show_id, shows.name as show_name FROM  subscriptions JOIN shows on subscriptions.show_id = shows.id WHERE user_id =?";
        db.query(query, mysubscription.getUserId(), function (error, results) {
            if (error) {
                throw error;
            }
            return res.json(results)
        });
    },
    unsubscribeSubscription: (req, res) => {
        class subscription {
            constructor(show_id) {
                this.show_id = show_id;
            }

            getShowId() {
                return this.show_id;
            }
        }

        let mysubscription = new subscription(req.params.show_id);
        let query = "DELETE FROM subscriptions WHERE show_id =?";
        db.query(query, mysubscription.getShowId(), function (error, results) {
            if (error) {
                throw error;
            }
            return res.json("You have successfully unsubscribed from this tv show.");
        });
    },
    viewShows: (req, res) => {
        let query = "SELECT shows.id as show_id, shows.name as show_name, shows.description as show_description, shows.time as show_time, genres.name as genre ,actors.name as actors FROM shows,actors, genres where shows.genre_id = genres.id";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json(result);
            }
        });
    },
    viewComments: (req, res) => {
        class Comments {
            constructor(show_id) {
                this.show_id = show_id;
            }

            getShowId() {
                return this.show_id;
            }
        }

        // let userId = "0mHSujZM"; //value from the session
        let comments = new Comments(req.params.show_id);
        let query = "SELECT comment_shows.id as comment_id, comment_shows.comment as comment, user_accounts.username as username FROM  comment_shows JOIN user_accounts on comment_shows.user_id = user_accounts.user_id WHERE show_id =?";
        db.query(query, comments.getShowId(), function (error, results) {
            if (error) {
                throw error;
            }
            return res.json(results)
        });
    },
    viewRatings: (req, res) => {
        class Ratings {
            constructor(show_id) {
                this.show_id = show_id;
            }

            getShowId() {
                return this.show_id;
            }
        }

        let ratings = new Ratings(req.params.show_id);
        let query = "SELECT ratings.id as rating_id, ratings.rating as rating, user_accounts.username as username FROM  ratings JOIN user_accounts on ratings.user_id = user_accounts.user_id WHERE show_id =?";
        db.query(query, ratings.getShowId(), function (error, results) {
            if (error) {
                throw error;
            }
            return res.json(results)
        });
    },
    viewActors: (req, res) =>{
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
                throw error;
            }
            return res.json(results)
        });
    }
}
