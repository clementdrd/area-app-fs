var nodemailer = require("nodemailer")
var fetch = require("node-fetch")

class Mail {

    constructor() {
        this.refresh_token = "1//03Vi0l-NXqwNjCgYIARAAGAMSNwF-L9IrQh1hFIsl2Pf9cuh2RJ6NHUxTBj9ZxaGCIE5sSALwAbRqqdLLR7sduZiXe2wTZ3XzQhg";
        this.user = "areaautomatedresponse@gmail.com"
        this.clientId = "1053737486062-pdkrjca280v384pk79hv9vndr0df3kgl.apps.googleusercontent.com"
        this.secret = "buBUasroJf0i4Sp3UnGGHUu7"
        this.access_token = ""
    }

    generateAccessToken() {
        let url = "https://oauth2.googleapis.com/token"
        let body = JSON.stringify({
            client_id: this.clientId,
            client_secret: this.secret,
            refresh_token: this.refresh_token,
            grant_type: "refresh_token"
        })
        return fetch(url, { method: "POST", body: body })
            .then((res) => {
                return res.json()
            }).then((res) => {
                // console.log(res)
                return res.access_token
            })
        // console.log(this.access_token)
    }



    async sendEmail(recept, object, content) {
        await this.generateAccessToken().then((result) => {
            this.access_token = result
            console.log("Access Token = ", result)
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: this.user,
                    accessToken: this.access_token
                }
                // auth: {
                //     type: 'OAuth2',
                //     scope: "https://www.googleapis.com/auth/gmail.send",
                //     clientId: "1053737486062-pdkrjca280v384pk79hv9vndr0df3kgl.apps.googleusercontent.com",
                //     clientSecret: "buBUasroJf0i4Sp3UnGGHUu7",
                //     refreshToken: this.refresh_token
                // }
            });
            transporter.sendMail({
                from: this.user,
                to: recept,
                subject: object,
                text: content,
                // auth: {
                //     type: 'OAuth2',
                //     user: this.user,
                //     clientId: this.clientId,
                //     clientSecret: this.secret,
                //     refreshToken: this.refresh_token,
                //     accessToken: this.access_token,
                //     expires: 3599
                // }

            }).then((res) => {
                console.log("Mail sent")
            }).catch((err) => {
                console.log("Mail not sent")
            })
        })

    }

}

module.exports = Mail