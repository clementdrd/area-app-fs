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
                    "name": "Weekly Check",
                    "description ": "Do something weekly"
                }, {
                    "name": "new_like",
                    "description ": "The  user  gains a like  from  one of their  messages"
                }],
                "reactions ": [{
                    "name": "Like Music",
                    "description ": "The music is added to like list"
                },{
                    "name": "Follow Artist",
                    "description ": "Follow the artist"
                },
                {
                    "name": "Send a resume",
                    "description ": "send the top ten artist of the user"
                },{
                    "name":"search concerts",
                    "description" : "search concerts of an artist and send it via email"
                }
            ]},
            {
                "name": "Imgur",
                "actions ": [{
                    "name": "Daily",
                    "description ": "Do something Daily"
                }],
                "reactions ": [{
                    "name": "Post Nasa Picture of the day",
                    "description ": "Post on the account the nasa pic of the day"
                }
            ]},
            {
                "name": "Nasa",
                "actions ": [{
                    "name": "Daily",
                    "description ": "Do something Daily"
                }],
                "reactions ": [{
                    "name": "Send Email",
                    "description ": "Send Nasa pic of the day by email"
                }
            ]}
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