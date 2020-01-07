module.exports = function (app, db) {
    app.delete('/deleteUser', function (req, res) {

        if (req.body.username === "") {
            res.status(400).send("You can't send an empty username")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                res.status(400).send("Could not find the account")
            }
            else if (req.body.username === result[0].username) {
                db.collection("users").deleteOne({_id: result[0]._id})
                res.status(200).send("User " + req.body.username + " deleted")
            }
        })
    })
}