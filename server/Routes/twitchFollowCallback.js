module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.log(req.query);
        // console.log(req.query[hub])
        let hub = "hub.challenge"
        res.set("Content-Type", "text/plain")
        res.status(200).send(req.query[hub])
    })
}