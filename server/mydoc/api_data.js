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
    "type": "POST",
    "url": "/addAccessToken",
    "title": "Add Access Token",
    "description": "<p>Add an Access Token an his service</p>",
    "name": "Add_Access_Token",
    "version": "0.1.0",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "servicename",
            "description": "<p>The name of the service to get the associated Access Token</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>The value of the Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Token Added",
          "content": "HTTP/1.1 200 OK\n \"Service <Service Name> added\"",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyAccessToken",
            "description": "<p>The access token is empty or undefined</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "Empty Access Token",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't put an empty value for the Access Token\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/getAccessToken",
    "title": "Get Access Token",
    "description": "<p>Get the access token associated to a service</p>",
    "name": "Get_Access_Token",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "servicename",
            "description": "<p>The name of the service to get the associated access token</p>"
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
            "field": "servicetoken",
            "description": "<p>access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "GetToken",
          "content": "HTTP/1.1 200 OK\n headers: {\n     servicetoken : <Access Token>\n }\n \"Token returned in the headers\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/imgurnasadaily",
    "title": "Activate Imgur + Nasa service",
    "description": "<p>Get the access token associated to a service</p>",
    "name": "Get_Access_Token",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "servicename",
            "description": "<p>The name of the service to get the associated access token</p>"
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
            "field": "servicetoken",
            "description": "<p>access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "GetToken",
          "content": "HTTP/1.1 200 OK\n headers: {\n     servicetoken : <Access Token>\n }\n \"Token returned in the headers\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/getAllServices",
    "title": "Get service list",
    "description": "<p>Get a list of all service, existing for this user</p>",
    "name": "Get_Service_List",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "ServiceName",
            "description": "<p>The name of the service</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "Service",
            "description": "<p>Each existing service is in the array</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "GetToken",
          "content": "HTTP/1.1 200 OK\n{\n     Service: [<Service1>, <Service2>]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/removeAccessToken",
    "title": "Remove a Service",
    "description": "<p>Remove a service and his Access Token</p>",
    "name": "Remove_Access_Token",
    "version": "0.1.0",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "servicename",
            "description": "<p>The name of the service to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Token Updated",
          "content": "HTTP/1.1 200 OK\n \"Service <Service Name> deleted\"",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "PUT",
    "url": "/updateAccessToken",
    "title": "Update Access Token",
    "description": "<p>Update the Access Token associated to a service</p>",
    "name": "Update_Access_Token",
    "version": "0.1.0",
    "group": "AccessTokens",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "servicename",
            "description": "<p>The name of the service to update</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>The new value for the Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Token Updated",
          "content": "HTTP/1.1 200 OK\n \"Service <Service Name> updated\"",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/Tokens.apidoc.js",
    "groupTitle": "AccessTokens",
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
            "field": "EmptyFields",
            "description": "<p>You sent an empty field</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyAccessToken",
            "description": "<p>The access token is empty or undefined</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoService",
            "description": "<p>This service was not associated to the user</p>"
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        },
        {
          "title": "Empty Access Token",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't put an empty value for the Access Token\"",
          "type": "String"
        },
        {
          "title": "No Service",
          "content": "HTTP/1.1 422 Unprocessable Entity\n\"The service <Service Name> has not been initiated for this user\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/deleteUser",
    "title": "Delete user as admin",
    "name": "Delete_User",
    "group": "Admin_commands",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the admin account</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token admin</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "userToDelete",
            "description": "<p>Username of the account to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Online",
          "content": "HTTP/1.1 200 OK\n \"User John deleted by admin\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/Admin.apidoc.js",
    "groupTitle": "Admin_commands",
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
          "title": "Empty Fields",
          "content": "HTTP/1.1 400 Bad Request\n\"You can't send an empty field\"",
          "type": "String"
        }
      ]
    }
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
    "type": "get",
    "url": "/dribblepost",
    "title": "Dribble - Imgur",
    "description": "<p>Post uploaded to dribble will be uploaded to Imgur</p>",
    "name": "DribbleToImgur",
    "group": "Dribble",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Dribble.apidoc.js",
    "groupTitle": "Dribble",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/send_best_img_pic_to_dropbox",
    "title": "Imgur - DropBox",
    "description": "<p>The picture of the week on Imgur will be uploaded to Dropbox</p>",
    "name": "ImgurToDropbox",
    "group": "DropBox",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/dropbox.apidoc.js",
    "groupTitle": "DropBox",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/send_nasa_pic_to_dropbox",
    "title": "Nasa - DropBox",
    "description": "<p>The daily Nasa picture will be uploaded to Dropbox</p>",
    "name": "NasaToDropbox",
    "group": "DropBox",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/dropbox.apidoc.js",
    "groupTitle": "DropBox",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/gitlabTrello",
    "title": "Gitlab - Trello",
    "description": "<p>Create Trello boards based on gitlab existing projects</p>",
    "name": "GitlabToTrello",
    "group": "Gitlab",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/trello.apidoc.js",
    "groupTitle": "Gitlab",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/ImgurFavorites",
    "title": "Favorite a picture and the owner know it",
    "description": "<p>Adding a picture to the favorite puts a comment on the post</p>",
    "name": "FavoriteToComment",
    "group": "Imgur",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Imgur.apidoc.js",
    "groupTitle": "Imgur",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenNotFound",
            "description": "<p>The userToken was not found in the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        },
        {
          "title": "Token Not Found",
          "content": "HTTP/1.1 404 Not Found\n\"Undefined userToken in tokens collections\"",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "ImgurEnabled",
            "description": "<p>The service is enable</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Imgur Enabled",
          "content": "HTTP/1.1 200 OK\n\"get Info from the Imgur account\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/imgurnasadaily",
    "title": "Upload the Nasa picture to Imgur",
    "description": "<p>Upload the Nasa picture of the day, to the associated Imgur account</p>",
    "name": "ImgurNasaDaily",
    "group": "Imgur",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Imgur.apidoc.js",
    "groupTitle": "Imgur",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/nasadaily",
    "title": "New Information about the Nasa",
    "description": "<p>Get resume every day about the picture of the day provided by the Nasa</p>",
    "name": "NasaDaily",
    "group": "Nasa",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Nasa.apidoc.js",
    "groupTitle": "Nasa",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/spotifyhistory",
    "title": "Set up an history of listened Music",
    "description": "<p>Listening to a music will either like it, follow the artist or find one of his concert</p>",
    "name": "History",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          },
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "mode",
            "description": "<p>&quot;like&quot; - &quot;follow&quot; - &quot;concert&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Spotify.apidoc.js",
    "groupTitle": "Spotify",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The method use was not the right one</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n\"Bad Request\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/spotifyresume",
    "title": "Resume of the week",
    "description": "<p>Get resume of the top 10 artists of the week by Email</p>",
    "name": "Resume",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/Spotify.apidoc.js",
    "groupTitle": "Spotify",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/trelloGitlab",
    "title": "Trello - Gitlab",
    "description": "<p>create gitlab project from existing trello board</p>",
    "name": "TrelloToGitlab",
    "group": "Trello",
    "parameter": {
      "fields": {
        "Request headers": [
          {
            "group": "Request headers",
            "type": "String",
            "optional": false,
            "field": "usertoken",
            "description": "<p>The token that belongs to the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./doc/trello.apidoc.js",
    "groupTitle": "Trello",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Activated",
            "description": "<p>This AREA has been activated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Activated",
          "content": "HTTP/1.1 200 OK\n\"Activated\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The user was not authorized to perform the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n\"Unauthorized\"",
          "type": "String"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/autologin",
    "title": "Log an user without requiring is information",
    "name": "AutoLogin",
    "description": "<p>Automatically log the user</p>",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "userToken",
            "description": "<p>Token of the account to log</p>"
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
          "content": " HTTP/1.1 200 OK\n\"Valid Token\"",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>No Token has been sent in the headers</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable",
            "description": "<p>The token you sent doesn 't match any account in the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalid Token",
          "content": "HTTP / 1.1 400 Bad Request\n\"Invalid token\"",
          "type": "String"
        },
        {
          "title": "Invalid token",
          "content": "HTTP / 1.1 422 Unprocessable Entity\n\"Unprocessable Entity\"",
          "type": "String"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./doc/UserManagement.apidoc.js",
    "groupTitle": "UserManagement"
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
