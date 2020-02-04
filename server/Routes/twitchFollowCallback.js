module.exports = function (app, db) {
    app.get("/twitchfollowcallback", (req, res) => {
        console.log(req.query);
        let hub = "hub.challenge"
        res.set("Content-Type", "text/plain")
        res.status(200).send(req.query[hub])
    })

    app.post("/twitchfollowcallback", (req, res) => {
        console.log(req.body)
        // console.log(req.query[hub])
        // res.set("Content-Type", "application/json")
        res.status(200).send()
    })

}


/*
{
    data: [
        {
            followed_at: '2020-01-22T16:00:23Z',
            from_id: '55249491',
            from_name: 'Zuma_Torney',
            to_id: '71852533',
            to_name: 'OgamingLoL'
        }
    ]
}
*/