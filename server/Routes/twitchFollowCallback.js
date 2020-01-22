module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.log(req.headers, req.body)
    })
}