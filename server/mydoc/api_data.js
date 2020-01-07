define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./mydoc/main.js",
    "group": "/home/Matthieu-CM/DEV_area_2019/server/mydoc/main.js",
    "groupTitle": "/home/Matthieu-CM/DEV_area_2019/server/mydoc/main.js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/user/:email/:token",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the account to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User Deleted",
          "content": "HTTP/1.1 200\n \"User deleted\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "name": "DeleteUserEmailToken",
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
            "field": "AnotherAccount",
            "description": "<p>The account to delete wasn't matching with the user own access_token</p>"
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
          "title": "Another Account",
          "content": "HTTP/1.1 403 Forbidden\n\"You can only delete your account\"",
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
          "content": "HTTP/1.1 200",
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
          "content": "HTTP/1.1 400 Bad Request\n\"This account doesn't exists\"",
          "type": "String"
        },
        {
          "title": "Bad Password",
          "content": "HTTP/1.1 400 Bad Request\n\"Passwords doesn't match\"",
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
            "description": "<p>(In the body) Email to associate with the account</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User Created",
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
          "content": "HTTP/1.1 400 Bad Request\n\"User John already exists\"",
          "type": "String"
        },
        {
          "title": "Email Exist",
          "content": "HTTP/1.1 400 Bad Request\n\"An email is already associate with an account\"",
          "type": "String"
        }
      ]
    }
  }
] });
