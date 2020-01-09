let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var app = require('../app.js');

chai.use(chaiHttp);
chai.request('http://localhost:8080');

before(done => {
    app.on("listening", function (err) {
        done()
    })
})

describe('Basic test', () => {
    it('it should return 404', (done) => {
        chai.request(app)
            .get('/edeho')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('Is API online and accessible', (done) => {
        chai.request(app)
            .get('/isonline')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("Online");
                done();
            });
    });

    it('\"/\" should return 404', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

var userToken;

describe('/POST register', () => {
    it('it register an account', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "toto", email: "matthieu.correia-moreira@epitech.eu" })
            .end((err, res) => {
                res.text.should.be.eql("User created")
                res.should.have.status(200);
                res.header.should.have.property("usertoken")
                done();
            });
    });


    // it('it cannot register two account with the same username', (done) => {
    //     chai.request(app)
    //         .post('/register')
    //         .set('content-type', 'application/x-www-form-urlencoded')
    //         .send({ username: "TestAccount", password: "toto", email: "matthieu.correia-moreira@epitech.eu" })
    //         .end((err, res) => {
    //             res.text.should.be.eql("User TestAccount already exist")
    //             res.should.have.status(400);
    //             done();
    //         });
    // });

    it('it cannot register with empty username', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", password: "toto", email: "matthieu.correia-moreira@epitech.eu" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('it cannot register with empty password', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "", email: "matthieu.correia-moreira@epitech.eu" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('it cannot register with empty email', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "toto", email: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('it cannot register with empty fields', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", password: "", email: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });
});


describe('/POST login', () => {
    it('Cannot login with empty username', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", password: "toto" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('Cannot login with empty password', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('Cannot login with empty fields', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", password: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });

    it('Cannot log a non existing user', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "dùhzodhùozhùd", password: "toto" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("This account doesn't exists")
                done();
            });
    });

    it('Cannot log with an wrong password', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "TestAccount" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("Passwords doesn't match")
                userToken = res.header.usertoken
                done();
            });
    });

    it('Can log as admin', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "admin", password: "admin" })
            .end((err, res) => {
                res.text.should.be.eql("User connected!")
                res.header.should.have.property("usertoken")
                res.should.have.status(200);
                done();
            });
    });

    it('Can log as a user', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", password: "toto" })
            .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property("usertoken")
                userToken = res.header.usertoken
                res.text.should.be.eql("User connected!")
                done();
            });
    });
});


describe('/DELETE deleteUser', () => {
    it('Cannot delete another user account', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccountant", userToken: userToken })
            .end((err, res) => {
                res.text.should.be.eql("You are not allowed to modify another user account")
                res.should.have.status(403);
                done();
            });
    });

    it('Cannot delete account without username', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", userToken: userToken })
            .end((err, res) => {
                res.text.should.be.eql("You can't send an empty field")
                res.should.have.status(400);
                done();
            });
    });

    it('Cannot delete account without token', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount" })
            .end((err, res) => {
                res.text.should.be.eql("You can't send an empty field")
                res.should.have.status(400);
                done();
            });
    });

    it('Cannot delete account with empty fields', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "" })
            .end((err, res) => {
                res.text.should.be.eql("You can't send an empty field")
                res.should.have.status(400);
                done();
            });
    });

    it("False Token", (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", userToken: "UDHBKZBEFD62727892BBS" })
            .end((err, res) => {
                res.text.should.be.eql("You are not allowed to do this request")
                res.should.have.status(403);
                done();
            });
    });

    it('Can delete an account', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "TestAccount", userToken: userToken })
            .end((err, res) => {
                res.text.should.be.eql("User TestAccount deleted")
                res.should.have.status(200);
                done();
            });
    });
});


after(done => {
    let server = app.listen()
    server.close(done)
    setTimeout(function () {
        process.exit()
    }, 9999)
});
