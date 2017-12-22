let async = require('async');

module.exports = function reqDeque(requests, done) {
    let requestsForSeries = requests.map((req) => {
        return (callback) => {
            req().then(callback).catch(callback);
        };
    });
    async.series(requestsForSeries, done);
};