var express = require('express');


var routes = function (Game) {
    var gameRouter = express.Router();

    gameRouter.route('/')
        .post(function (req, res) {
            var game = new Game(req.body);


            game.save();
            res.status(201).send(game);

        })
        .get(function (req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Game.find(query, function (err, games) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(games);
            });
        });

    gameRouter.use('/id/:gameId', function (req, res, next) {
        Game.findById(req.params.gameId, function (err, game) {
            if (err)
                res.status(500).send(err);
            else if (game) {
                req.game = game;
                next();
            }
            else {
                res.status(404).send('no game found');
            }
        });
    });
    gameRouter.route('/id/:gameId')
        .get(function (req, res) {

            res.json(req.game);

        })
        .put(function (req, res) {
            req.game.gamename = req.body.gamename;
            req.game.publisher = req.body.publisher;
            req.game.rating = req.body.rating;
            req.game.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.game);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.game[p] = req.body[p];
            }

            req.game.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.game);
                }
            });
        })
        .delete(function (req, res) {
            req.game.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });

    gameRouter.route('/get-all-games-for-user')
        .post(function (req, res) {

            Game.find({ user_id: req.body.userID }, function (err, games) {
                console.log('from get all games for user err: ', err, 'games: ', games);
                if (err) {
                    res.status(500).send(err);
                } else if (games.length == 0) {
                    res.status(201).send({ errorMessage: "Game not found or no games in the database yet!" });
                } else {
                    res.status(201).send(games);
                }
            });
        })
    return gameRouter;
};

module.exports = routes;