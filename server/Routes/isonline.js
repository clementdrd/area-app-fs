module.exports = function (app, db) {
    app.get('/isonline', function (req, res) {
        res.send(200, 'Online');
    })
}