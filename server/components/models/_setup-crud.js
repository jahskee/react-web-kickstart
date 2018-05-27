const RouterFactory = require('node-express-crud-router').RouterFactory;

setupCrud = (app) => {
    const customerRouter = RouterFactory.create({path: "customers",model: require('./Customer')});
    app.use("/api", customerRouter);

    const contactRouter = RouterFactory.create({path: "contacts",model: require('./Contact')});
    app.use("/api", contactRouter);
}

module.exports = setupCrud