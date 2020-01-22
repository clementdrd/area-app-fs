module.exports = function (app, db) {
    app.post("/twitchfollowcallback", (req, res) => {
        console.log(req.headers, req.body)
    })
}