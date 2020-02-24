class Token {
    constructor(db) {
        this.db = db;
    }

    getToken(serviceName, userToken) {
        this.db.collection("tokens").find({
            userToken: userToken
        }).toArray(function (err, result) {
            if (result[0] === undefined) {
                return({data: "Could not find an account that matches the token"})
            } else {
                let serviceValue = result[0][serviceName.toLowerCase()]
                if (serviceValue === undefined) {
                    return ({data: "The service " + serviceName + " has not been initiated for this user"})
                } else {
                    return ({data: serviceValue })
                }
            }
        })
    }

}

module.exports = Token;

//let token = new Token(db)
//token.getToken("Spotify", "572T83802U")