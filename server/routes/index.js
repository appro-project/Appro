const productsRouter = require('./project');

module.exports = function (app) {
    app.use('/api/v1/project', productsRouter);
};



