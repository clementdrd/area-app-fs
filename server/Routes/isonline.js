module.exports = function (app, db) {
    app.get('/isonline', function (req, res) {
        res.status(200).send('Online');
    })
}