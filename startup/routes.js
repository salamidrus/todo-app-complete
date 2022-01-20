const routes = require("../routes")
const errorHandler = require("../middlewares/error")

module.exports = function (app) {
    app.use(routes)
    app.use(errorHandler)
}