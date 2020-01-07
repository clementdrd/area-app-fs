let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var app = require('../app.js');

chai.use(chaiHttp);
chai.request('http://localhost:8080');

before(done => {
    console.log("CHOSE")
    app.on("listening", function (err) {
        console.log("COUCOU")
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
    it('it should display Online', (done) => {
        chai.request(app)
            .get('/isonline')
            .end((err, res) => {
                res.should.have.status(200);
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


after(done => {
    console.log("COUCOU")
    let server = app.listen()
    server.close(done)
    setTimeout(function() {
        process.exit()
    }, 9999)
});