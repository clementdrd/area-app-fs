module.exports = function (app, db) {
    app.get('/createEventFacebook', (req, res) => {
        res.status(200).send("init route ok");
    });
}