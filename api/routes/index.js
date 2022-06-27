const productRouter = require("./product")
const userRouter = require("./user")
const supplierRouter = require("./supplier")
const categoryRouter = require("./category")
const orderRouter = require('./order')
function routes(app) {
    app.use("/product", productRouter)
    app.use("/user", userRouter)
    app.use("/supplier", supplierRouter)
    app.use("/category", categoryRouter)
    app.use("/order", orderRouter)
}

module.exports = routes