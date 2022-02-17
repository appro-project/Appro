const productsRouter = require('./project');
const imagesRouter = require('./image');

module.exports = function (app) {
    app.use('/api/v1/project', productsRouter);
    app.use('/api/v1/image', imagesRouter);
};



