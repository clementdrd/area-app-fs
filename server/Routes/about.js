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
                },
                {
                    "name": "Upload File",
                    "description ": "Upload Nasa pic of the day"
                }
            ]},
            {
                "name": "Trello",
                "actions ": [{
                    "name": "Create Board",
                    "description ": "Trigger when creating a board"
                }],
                "reactions ": [{
                    "name": "Create Board",
                    "description ": "Create a board"
                }
            ]},
            {
                "name": "Gitlab",
                "actions ": [{
                    "name": "Create Project",
                    "description ": "Trigger when creating a Project"
                }],
                "reactions ": [{
                    "name": "Create Project",
                    "description ": "Create a Project"
                }
            ]},
            {
                "name": "Dropbox",
                "actions ": [{
                    "name": "Create a picture to the root",
                    "description ": "Trigger when creating a picture to the root"
                }],
                "reactions ": [{
                    "name": "Create a picture to the root",
                    "description ": "Create a picture to the root"
                }
            ]},
            {
                "name": "Dribble",
                "actions ": [{
                    "name": "Upload shots",
                    "description ": "Trigger when uploading shots to dribble"
                }],
                "reactions ": [{
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