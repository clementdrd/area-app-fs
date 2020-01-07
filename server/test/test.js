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


after(done => {
    let server = app.listen()
    server.close(done)
    setTimeout(function() {
        process.exit()
    }, 9999)
});