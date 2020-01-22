module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.log("COUCOU" + req.params)
    })
}