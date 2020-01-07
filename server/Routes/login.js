module.exports = function (app, db) {
    app.post('/login', function (req, res) {
        console.log('Inside POST /login callback function')
        console.log(req.body)//req.body.username //req.body.passwd
        //username + passwd
        if (req.body.username === "" || req.body.password === "") {
            res.send(400, "You can't send an empty field")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                res.send(400, "This account doesn't exists")
            } else if (result[0].passwd !== req.body.passwd) {
                    res.send(400, "Passwords doesn't match")
            } else {
                res.send(200, 'User connected!\n')
            }
        })
    })
}