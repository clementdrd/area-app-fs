module.exports = function (app, db) {
    app.delete('/deleteUser', function (req, res) {
        console.log('Inside GET /deleteUser callback function')
        console.log(req.body)

        if (req.body.username === "") {
            res.send("You can't send an empty username")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                res.send("User doesn't exist")
            }
            else if (req.body.username === result[0].username) {
                db.collection("users").remove({_id: result[0]._id})
                res.send(200, "User " + req.body.username + " deleted");
            }
        })
    })
}