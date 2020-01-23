module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.log(req.query);
        // console.log(req.query[hub])
        let hub = "hub.challenge"
        res.set("Content-Type", "text/plain")
        res.status(200).send(req.query[hub])
    })

    app.post("/twitchfollowcallback", (req, res) => {
        console.log(req.headers);
        console.log(req.body)
        // console.log(req.query[hub])
        // res.set("Content-Type", "application/json")
        res.status(200).send()
    })
}