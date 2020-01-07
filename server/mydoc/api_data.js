define({ "api": [
  {
    "type": "delete",
    "url": "/deleteUser",
    "title": "Delete a User",
    "description": "<p>delete an User account</p>",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User own token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User Deleted",
          "content": "HTTP/1.1 200\n \"User John deleted\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "name": "DeleteDeleteuser",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantFindAccount",
            "description": "<p>The account to delete cannot be found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyAccountField",
            "description": "<p>The account can't have an empty username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Cant Find Account",
          "content": "HTTP/1.1 400 Not Modified\n\"Could not find the account\"",
          "type": "String"
        },
        {
          "title": "Cant Find Account",
          "content": "HTTP/1.1 400 Not Modified\n\"You can't send an empty username\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Log an User",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the account (in the body)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the account (In the body)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User Loged",
          "content": "HTTP/1.1 200\n \"User John Created\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostLogin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DoesntExist",
            "description": "<p>The account doesn't exists in the database</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadPassword",
            "description": "<p>The password doesn't match with the one stored for this account</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyFields",
            "description": "<p>Either the username or the password as been sent as empty</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Doesnt Exist",
          "content": "HTTP/1.1 400 Bad Request\n\"This account doesn't exist\"",
          "type": "String"
        },
        {
          "title": "Bad Password",
          "content": "HTTP/1.1 400 Bad Request\n\"Password doesn't match\"",
          "type": "String"
        },
        {
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a User",
    "description": "<p>Create an account for the user</p>",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>(In the body) Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>(In the body) Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>[TO DO] (In the body) Email to associate with the account</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User John connected",
          "content": "HTTP/1.1 200\n \"Account created\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostRegister",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserExist",
            "description": "<p>The Username is already taken</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailExist",
            "description": "<p>The Email is already associated to an account</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Cant Update",
          "content": "HTTP/1.1 400 Bad Request\n\"User John already exist\"",
          "type": "String"
        },
        {
          "title": "Email Exist",
          "content": "[TO DO] HTTP/1.1 400 Bad Request\n\"An email is already associate with an account\"",
          "type": "String"
        }
      ]
    }
  }
] });
