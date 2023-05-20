const productsRouter = require('./project');
const imagesRouter = require('./image');
const photoRouter = require('./photo');
const messagesRouter = require('./feedback');

module.exports = function (app) {
    app.use('/api/v1/project', productsRouter);
    app.use('/api/v1/image', imagesRouter);
    app.use('/api/v1/photos', photoRouter);
    app.use('/api/v1/feedback', messagesRouter);
};
