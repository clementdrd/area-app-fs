module.exports = function (app, db) {
    app.post('/login', function (req, res) {
        if (req.body.username === "" || req.body.password === "") {
            res.status(400).send("You can't send an empty field")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                res.status(400).send("This account doesn't exists")
            } else if (result[0].passwd !== req.body.passwd) {
                res.status(400).send("Passwords doesn't match")
            } else {
                res.status(200).send("User connected!")
            }
        })
    })
}