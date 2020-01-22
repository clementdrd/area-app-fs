module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.error("COUCOU" + req.params)
        // res.set("Content-Type", "text/plain")
        // res.status(200).send()
    })
}