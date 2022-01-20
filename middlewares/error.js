module.exports = function (err, req, res, next) {
    if (err) {
        const status = err.status || 400
        res.status(status).json({
            success: false,
            message: err.message || "Something wrong"
        })
    }
}