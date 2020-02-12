module.exports = function (app, db) {
    app.get("/about.json", (req, res) => {
        let ip = req.ip.split(":")[3]
        let services = [
            {
                "name": "Spotify",
                "actions ": [{
                    "name": "Listen Music",
                    "description ": "L'utilisateur ecoute une musique"
                }, {
                    "name": "new_message_inbox",
                    "description ": "A new  private  message  is  received  by the  user"
                }, {
                    "name": "new_like",
                    "description ": "The  user  gains a like  from  one of their  messages"
                }],
                "reactions ": [{
                    "name": "Like Music",
                    "description ": "The music is added to like list"
                }]
            }
        ]
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