const productRouter = require("./product")
function routes(app) {
    app.use("/product", productRouter)
}

module.exports = routes