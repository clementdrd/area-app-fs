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

describe('/GET edeho', () => {
    it('it should return 404', (done) => {
        chai.request(app)
            .get('/edeho')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/GET isonline', () => {
    it('Is API online and accessible', (done) => {
        chai.request(app)
            .get('/isonline')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("Online");
                done();
            });
    });
}); 

describe('/GET ', () => {
    it('it should work', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
}); 

describe('/POST register', () => {
    it('it register an account', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "toto" })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("User created")
                done();
            });
    });
}); 

describe('/POST register', () => {
    it('it cannot register two account with the same username', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "toto" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("This user already exists")
                done();
            });
    });
}); 

describe('/POST register', () => {
    it('it cannot register with empty username', (done) => {
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
});

describe('/POST register', () => {
    it('it cannot register with empty password', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });
});

describe('/POST register', () => {
    it('it cannot register with empty fields', (done) => {
        chai.request(app)
            .post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "", password: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });
});

describe('/POST login', () => {
    it('it cannot login with empty username', (done) => {
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
});

describe('/POST login', () => {
    it('it cannot login with empty password', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "" })
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eql("You can't send an empty field")
                done();
            });
    });
});

describe('/POST login', () => {
    it('it cannot login with empty fields', (done) => {
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
});

describe('/POST login', () => {
    it('it cannot log a non existing user', (done) => {
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
}); 

describe('/POST login', () => {
    it('it cannot log with an wrong password', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "Guillaume" })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("User connected!")
                done();
            });
    });
});

describe('/POST login', () => {
    it('it log an user', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "toto" })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("User connected!")
                done();
            });
    });
});

describe('/DELETE deleteUser', () => {
    it('it deletes an user', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "Guillaume", password: "toto" })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql("User Guillaume deleted")
                done();
            });
    });
});


after(done => {
    let server = app.listen()
    server.close(done)
    setTimeout(function() {
        process.exit()
    }, 9999)
});