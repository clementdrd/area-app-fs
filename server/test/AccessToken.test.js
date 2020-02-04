let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var app = require('../server.js');

chai.use(chaiHttp);
chai.request('http://localhost:8080');

before(done => {
    app.on("listening", function (err) {
        done()
    })
})

describe('API is online', () => {
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

var userToken;

describe('/POST register', () => {
    it('Can log as a user', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "AccessTokensTestAccount", password: "toto" })
            .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property("usertoken")
                userToken = res.header.usertoken
                res.text.should.be.eql("User connected!")
                done();
            });
    });
});

describe('/ADD ACCESS TOKEN', () => {
    it('Can add an Access Token', (done) => {
        chai.request(app)
            .post('/addAccessToken')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ servicename: "testService", userToken: userToken, value: "The test is a lie" })
            .end((err, res) => {
                res.text.should.be.eql("Service testService added")
                res.should.have.status(200);
                done();
            });
    }); 
    
    it('The UserToken is not the right one', (done) => {
        chai.request(app)
            .post('/addAccessToken')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ servicename: "testService", userToken: "toto", value: "The test is a lie" })
            .end((err, res) => {
                res.text.should.be.eql("You are not allowed to do this request")
                res.should.have.status(403);
                done();
            });
    });
});

describe('/GET ACCESS TOKEN', () => {
    it('Can get an Access Token', (done) => {
        chai.request(app)
            .get('/getAccessToken')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('servicename', 'testService')
            .set('userToken', userToken)
            .end((err, res) => {
                res.text.should.be.eql("Token returned in the headers")
                res.should.have.status(200);
                res.header.should.have.property("serviceToken")
                res.header.serviceToken.should.be.eql("The test is a lie")
                done();
            });
    });
});

describe('/DELETE deleteUser', () => {
    it('Can delete an account', (done) => {
        chai.request(app)
            .delete('/deleteUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "AccessTokensTestAccount", userToken: userToken })
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
