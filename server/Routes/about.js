module.exports = function (app, db) {
    app.get("/about.json", (req, res) => {
        let ip = req.ip.split(":")[3]
        let services = [{data: "Dont forget to update services"}]
        res.set("Content-Type", "application/json")
        res.send({
            client : { 
                "host" : ip
            },
            server : { 
                current_time: Math.floor(new Date() / 1000),
                services: services
            }
        })
    })
}