var express = require('express');


var routes = function (User) {
    var userRouter = express.Router();

    userRouter.route('/')
        .post(function (req, res) {
            var user = new User(req.body);


            user.save();
            res.status(201).send(user);

        })
        .get(function (req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            User.find(query, function (err, users) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(users);
            });
        });

    userRouter.use('/id/:userId', function (req, res, next) {
        User.findById(req.params.userId, function (err, user) {
            if (err)
                res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(404).send('no user found');
            }
        });
    });
    userRouter.route('/id/:userId')
        .get(function (req, res) {

            res.json(req.user);

        })
        .put(function (req, res) {
            req.user.username = req.body.username;
            req.user.Email = req.body.Email;
            req.user.password = req.body.password;
            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.user);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.user[p] = req.body[p];
            }

            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.user);
                }
            });
        })
        .delete(function (req, res) {
            req.user.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });

    userRouter.route('/get-all-users-for-user')
        .post(function (req, res) {

            User.find({ user_id: req.body.userID }, function (err, users) {
                console.log('from get all users for user err: ', err, 'users: ', users);
                if (err) {
                    res.status(500).send(err);
                } else if (users.length == 0) {
                    res.status(201).send({ errorMessage: "User not found or no users in the database yet!" });
                } else {
                    res.status(201).send(users);
                }
            });
        })
    return userRouter;
};

module.exports = routes;