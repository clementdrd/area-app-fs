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
    "type": "get",
    "url": "/isonline",
    "title": "Check if API is up",
    "name": "IsOnline",
    "group": "Basic_commands",
    "success": {
      "examples": [
        {
          "title": "Online",
          "content": "HTTP/1.1 200 OK\n \"Online\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Basic.apidoc.js",
    "groupTitle": "Basic_commands"
  },
  {
    "type": "get",
    "url": "/<all_non_exiting_route>",
    "title": "Return 404",
    "name": "Page_not_found",
    "group": "Basic_commands",
    "success": {
      "examples": [
        {
          "title": "Page not found",
          "content": "HTTP/1.1 404\n \"404 page not found\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Basic.apidoc.js",
    "groupTitle": "Basic_commands"
  },
  {
    "type": "delete",
    "url": "/deleteUser",
    "title": "Delete a User",
    "name": "Delete_Account",
    "description": "<p>delete an User account</p>",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "userToken",
            "description": "<p>Token of the account to delete</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the account to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "User Deleted",
          "content": "HTTP/1.1 200 OK\n \"User John deleted\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FalseToken",
            "description": "<p>The token you sent doesn't match any account in the database</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>The token and the username doesn't belongs to the same account</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "False Token",
          "content": "HTTP/1.1 403 Forbidden\n\"You are not allowed to do this request\"",
          "type": "String"
        },
        {
          "title": "Not Allowed",
          "content": "HTTP/1.1 403 Forbidden\n \"You are not allowed to modify another user account\"",
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
    "url": "/login",
    "title": "Log an User",
    "name": "Login",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the account</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "userToken",
            "description": "<p>token for the authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User Loged",
          "content": "HTTP/1.1 200 OK\nheaders : { userToken : <token> }\n\"User connected!\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
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
            "description": "<p>You sent an empty field</p>"
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
    "name": "Register",
    "description": "<p>Create an account for the user</p>",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the new user</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the new user</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email to associate with the account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "userToken",
            "description": "<p>token for the authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Account created",
          "content": "HTTP/1.1 200 OK\nheaders : { userToken : <token> }\n\"Account created\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExist",
            "description": "<p>The Username is already taken</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyField",
            "description": "<p>You sent an empty field either in the username, password or email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User already exist",
          "content": "HTTP/1.1 400 Bad Request\n\"User John already exist\"",
          "type": "String"
        },
        {
          "title": "Empty Field",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        }
      ]
    }
  }
] });
