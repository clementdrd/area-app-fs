const fetch = require("node-fetch");

module.exports = {
    TOGitlab : TOGitlab
}

function TOGitlab(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                if (test[0] != undefined) {
                    if (test[0].gitlabtrelloOrga == true) {
                        getBoards(element.userToken, db, "gitlab")
                    }else if (test[0].trellogitlabOrga == true) {
                        getBoards(req.headers.usertoken, db, "trello")
                    }
                }
            })
        });
    });
}

function getBoards(token, db, mode)
{
    db.collection("tokens").find({userToken: token}).toArray(function(err, result) {
        var url ='https://api.trello.com/1/members/me?key=51fa8f3fa712867ca344ee0bb04b1de0&token=' + result[0].trello;
        fetch(url, { method: 'GET'})
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res.error.status, res.error.message)
            }
        }).then(json => {
            var names = new Array()
            console.log(json);
            getNames(json.idOrganizations, db, token ,result[0].trello, names, mode)
        })
    })
}

function getNames(ids, db, userToken, trelloToken, names, mode)
{
    var url ="https://api.trello.com/1/organizations/"+ids[0]+"?key=51fa8f3fa712867ca344ee0bb04b1de0&token=" + trelloToken;
    fetch(url, { method: 'GET'})
    .then(res => {
        console.log(ids)
        if (res.status === 200) {
            return res.json()
        } else {
            console.log(res.error.status, res.error.message)
        }
    }).then(json => {
        names.push(json.name)
        ids.shift();
        console.log(ids);
        if (ids.length > 0 && ids.length != null)
            getNames(ids, db, userToken, trelloToken, names, mode)
        else 
            getGitlabGroups(names, db, userToken, trelloToken, mode)
    })
}

function getGitlabGroups(names, db, userToken, trelloToken, mode)
{
    db.collection("tokens").find({userToken: userToken}).toArray(function(err, result) {
        var url ="https://gitlab.com/api/v4/groups"
        var header = {
            //'Authorization': 'Bearer cd3a92a1948ea8c76c3ecb086ca96c36cf6def8d9434a747b52d58c2ece5ae32'
            "Authorization": "Bearer " + result[0].gitlab
        }
        fetch(url, { method: 'GET', headers : header})
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res)
            }
        }).then(json => {
            if (mode === "trello")
                compareOrgaGroup(names, json, trelloToken)
            else
                compareGroupOrga(names,json, result[0].gitlab)
            //getGitlabProjects(names, db, result[0].gitlab, json, trelloToken, mode)
        })
    })
}

function compareGroupOrga(names, project, gitlabToken)
{
    var test = new Array()
    project.forEach( element => {
        test.push(element.name.toLowerCase().replace(/\s+/g, ''))
    })
    let difference = names.filter(x => !test.includes(x));
    console.log(names)
    console.log(test)
    console.log("diff")
    console.log(difference);
    CreateMissingGroup(difference, gitlabToken)
}

function compareOrgaGroup(names, project, trelloToken)
{
    var test = new Array()
    project.forEach( element => {
        test.push(element.name.toLowerCase().replace(/\s+/g, ''))
    })
    let difference = test.filter(x => !names.includes(x));
    //console.log(project[0].name)
    console.log(names)

    console.log(test)
    console.log("diff")
    console.log(difference);
    CreateMissingOrga(difference, trelloToken)
}

function CreateMissingOrga(diff, trelloToken)
{
    diff.forEach(element => {
        var url ='https://api.trello.com/1/organizations?displayName=' + element + "&key=51fa8f3fa712867ca344ee0bb04b1de0&token=" + trelloToken;
        fetch(url, { method: 'POST'})
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res)
            }
        })
    });
}

function CreateMissingGroup(diff, gitlabToken)
{
    diff.forEach(element => {
        var url ='https://gitlab.com/api/v4/groups?name=' + element + '&path=' + element;
        var header = {
            "Authorization": "Bearer " + gitlabToken
        }
        fetch(url, { method: 'POST', headers : header})
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res)
            }
        })
    });
}