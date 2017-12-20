let app = require('./app.js');
const randomstring = require('randomstring');
let games = {};


app.post('/api/game-create', function(req, res){
  if(!req.session.gameId){
    let gameId = randomstring.generate(16);
    games[gameId] = 'New game';
    req.session.gameId = gameId;
  }

  res.json({ gameId: req.session.gameId });
});

app.post('/api/game-connect', function(req, res){
  let gameId = req.body.gameId;
  if(games[gameId] !== undefined){
    req.session.gameId = gameId;
    res.send(games[gameId]);
  }
});

module.exports = app;