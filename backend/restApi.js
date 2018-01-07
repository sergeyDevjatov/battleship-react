const randomstring = require('randomstring');

module.exports = (app) => {
    let games = {};


    app.post('/api/game-create', function (req, res) {
        if (!req.session.gameId) {
            let gameId = randomstring.generate(16);
            let users = new Set([req.sessionID]);
            users.__proto__.toJSON = function () {
                return [...this];
            };
            games[gameId] = {
                users,
            };
            req.session.gameId = gameId;
        }

        res.status(200).json({gameId: req.session.gameId});
    });

    app.post('/api/game-connect', function (req, res) {
        let gameId = req.body.gameId;
        if (games[gameId] !== undefined) {
            req.session.gameId = gameId;
            games[gameId].users.add(req.sessionID);
            res.status(200).json({
                game: games[gameId],
            });
        } else {
            res.status(404).json({
                message: 'Such gameId not found',
            });
        }
    });

    app.post('/api/game-disconnect', function (req, res) {
        let gameId = req.session.gameId;
        if (games[gameId] !== undefined) {
            delete req.session.gameId;
            games[gameId].users.delete(req.sessionID);
            res.status(200).json();
        }
        else {
            res.status(403).json({
                message: 'User is not connected',
            });
        }
    });
};