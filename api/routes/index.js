const productRouter = require("./product")
const userRouter = require("./user")
const supplierRouter = require("./supplier")
function routes(app) {
    app.use("/product", productRouter)
    app.use("/user", userRouter)
    app.use("/supplier", supplierRouter)
}

module.exports = routes