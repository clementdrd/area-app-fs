class Token {
    constructor(db) {
        this.db = db;
        this.value;
    }

    async getToken(serviceName, userToken) {
        return await this.db.collection("tokens").find({
            userToken: userToken
        }).toArray((err, result) => {
            if (result[0] === undefined) {
                return ({data: "Could not find an account that matches the token"})
            } else {
                let serviceValue = result[0][serviceName.toLowerCase()]
                if (serviceValue === undefined) {
                    return ({data: "The service " + serviceName + " has not been initiated for this user"})
                } else {
                    return ({data: serviceValue })
                }
            }
        })
        // console.log("My return = ", myreturn)
        // console.log("Value = ", this.value)
    }
}

module.exports = Token;

//let token = new Token(db)
//token.getToken("Spotify", "572T83802U")