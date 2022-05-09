const productRouter = require("./product")
function routes(app) {
    app.use("/", productRouter)
}

module.exports = routes