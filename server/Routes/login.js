module.exports = function (app, db) {
    app.post('/login', function (req, res) {
        console.log('Inside POST /login callback function')
        console.log(req.body)//req.body.username //req.body.passwd
        //username + passwd
        if (req.body.username === "") {
            res.send("You can't send an empty username")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                res.send("User doesn't exist")
            }
            else if (result[0].passwd !== req.body.passwd) {
                    res.send("Passwords doesn't match")
            } else {
                res.send(200, 'User connected!\n')
            }
        })
    })
}