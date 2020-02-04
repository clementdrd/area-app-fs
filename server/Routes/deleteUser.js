module.exports = function (app, db) {
    app.delete('/deleteUser', function (req, res) {
            if (req.body.userToken === undefined || req.body.username === "") {
                res.status(400).send("You can't send an empty field")
                return;
            }

            db.collection("users").find({userToken: req.body.userToken}).toArray(function(err, result) {
                if (result[0] === undefined) {
                    res.status(403).send("You are not allowed to do this request")
                } else if (result[0].admin === true) {
                    db.collection("users").find({username: req.body.userToDelete}).toArray(function(er, accountToDelete) {
                        db.collection("users").deleteOne({ _id: accountToDelete[0]._id })
                        db.collection("tokens").deleteOne({ userToken: accountToDelete[0].userToken })
                    })
                    res.status(200).send("User " + req.body.userToDelete + " deleted by admin")
                } else if (req.body.username === result[0].username) {
                    db.collection("users").deleteOne({ _id: result[0]._id })
                    db.collection("tokens").deleteOne({ userToken: result[0].userToken })
                    res.status(200).send("User " + req.body.username + " deleted")
                } else {
                    res.status(403).send("You are not allowed to modify another user account")
                }
        })
    })
}