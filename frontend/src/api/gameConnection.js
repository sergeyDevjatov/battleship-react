import instance from './instance';

export default {
    create() {
        return instance.post('/api/game-create');
    },

    connect(gameId) {
        return instance.post('/api/game-connect', {
            gameId,
        });
    },

    disconnect() {
        return instance.post('/api/game-disconnect');
    }
}