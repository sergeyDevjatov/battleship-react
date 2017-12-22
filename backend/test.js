process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./server');
let reqDeque = require('./reqDeque');
let should = chai.should();

chai.use(chaiHttp);

describe('Game connection', () => {

    describe('Start new game', () => {
        it('it should return id of new game', (done) => {
            chai.request(app)
                .post('/api/game-create')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('gameId');
                    done();
                });
        });
    });

    describe('Connect to game by its id', () => {
        it('it should return object with list of users', (done) => {
            let gameId;

            reqDeque([
                function createGame() {
                    return chai.request(app)
                        .post('/api/game-create')
                        .then((res) => {
                            gameId = res.body.gameId;
                        });
                },
                function connectGame() {
                    return chai.request(app)
                        .post('/api/game-connect')
                        .send({gameId})
                        .then((res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('game');
                            res.body.game.should.be.a('object');
                            res.body.game.should.have.property('users');
                            res.body.game.users.should.be.a('array');
                            res.body.game.users.length.should.eq(2);
                        });
                },
            ], done);
        });
    });


    describe('Disconnect from a game', () => {
        it('it should return OK status', (done) => {
            let agent = chai.request.agent(app);

            reqDeque([
                function createGame() {
                    return chai.request(app)
                        .post('/api/game-create')
                        .then((res) => {
                            gameId = res.body.gameId;
                        });
                },
                function connectGame() {
                    return agent
                        .post('/api/game-connect')
                        .send({ gameId })
                        .then((res) => {
                        });
                },
                function disconnectGame() {
                    return agent
                        .post('/api/game-disconnect')
                        .then((res) => {
                            res.should.have.status(200);
                        });
                },
            ], done);
        });
    });
});