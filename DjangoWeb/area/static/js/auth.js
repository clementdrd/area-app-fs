let twitch_auth = window.open(
            "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=r5m2lcovdhgyv84zmu82utry0jtn5i&redirect_uri=" + window.location.href.slice(0, -1) + "&scope=viewing_activity_read",
            "Twitch auth",
            "resizable,scrollbars,status,location=yes,height=600,width=800"
        )
        var interval = setInterval(() => {
            try {
                if (twitch_auth.closed) {
                    clearInterval(interval)
                } else {
                    let url = JSON.stringify(twitch_auth.location.href)
                    twitch_auth.close()
                    var regex = /[?#&]([^=#]+)=([^&#]*)/g,
                        params = {},
                        match;
                    while (match = regex.exec(url)) {
                        params[match[1]] = match[2];
                    }
                    // console.log(url)
                    if (params.access_token === undefined) {
                    } else {
                        // console.log(params.access_token)
                        this.props.addAuth("twitch", params.access_token)
                        this.setState({ access_token: "OAuth " + params.access_token })
                        this.props.setToken("twitch", this.state.access_token)
                        twitch_auth.close()
                    }
                }
            } catch {
            }
        }, 1000)