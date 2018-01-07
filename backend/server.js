const app = require('./app.js');
const restApi = require('./restApi.js');

restApi(app);

app.listen(process.env.PORT | 5000);

module.exports = app;