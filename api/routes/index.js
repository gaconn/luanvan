const productRouter = require("./product")
const userRouter = require("./user")
function routes(app) {
    app.use("/product", productRouter)
    app.use("/user", userRouter)
}

module.exports = routes