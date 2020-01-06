/**
 * @apiDefine TokenManagementError
 *
 * @apiError DoesntExist The token passed in the body doesn't belong to an existing user
 *
 * @apiErrorExample {String} Doesnt Exist
 *     HTTP/1.1 400 Bad Request
 *     "User doesn't exits"
 * @apiError WrongUser The username and the token doesn't match
 *
 * @apiErrorExample {String} Wrong User
 *     HTTP/1.1 403 Forbidden
 *     "You can't modify another user account"
 */

/**
 * @apiDefine TokenUploadError
 * 
 * @apiError CantUpdate Could not update the account
 *
 * @apiErrorExample {String} Cant Update
 *     HTTP/1.1 304 Not Modified
 *     "Could not upload Token"
 * 
 */
/**
 * @apiDefine TokenRetrievementError
 *
 * @apiError NoToken No Token as registered for this service
 *
 * @apiErrorExample {String} No Token
 *     HTTP/1.1 400 Not Modified
 *     "No token was registered for this app"
 * 
 */

/**
 * @api {post} /addAccessToken/:username Upload an access_token to the database
 * @apiDescription upload access_token for an named service
 * @apiGroup TokenManagement
 *
 * @apiParam {Number} username Username of the user
 * @apiParam {String} token Token of the user (In the body)
 * @apiParam {String} access_token Access_token of the service (in the body) (To avoid reconnection everytime)
 * @apiParam {String} service Name of the service (In the body)
 *
 * @apiSuccessExample {String} Token Stored
 *     HTTP/1.1 200
 *      "Token registered in database"
 *
 * 
 * @apiUse TokenManagementError
 * @apiUse TokenUploadError
 */

 /**
 * @api {get} /getAccessToken/:username/:token/:service Get an access_token stored in database
 * @apiDescription Send to the user all the access_tokens for each service that he already identified
 * @apiGroup TokenManagement
 *
 * @apiParam {Number} username Username of the user
 * @apiParam {String} token Token of the user
 * @apiParam {String} service Name of the service
 *
 * @apiSuccess {String} service Name of the service ex:Twitch
 * @apiSuccess {String} access_token Access_token for the related service
 * 
 * @apiSuccessExample {json} Token Returned
 *     HTTP/1.1 200 {
 *      {
 *          <service> : <access_token>,
 *          "twitch": "myToken"
 *      }
 *
 * @apiUse TokenManagementError
 * @apiUse TokenRetrievementError
 */

  /**
 * @api {get} '/getToken/:token Get User Own Access_Token
 * @apiDescription Compare token found in the cookies with the ones that are in db
 * @apiGroup TokenManagement
 *
 * @apiParam {String} token autologin token that allows to identify the user for the request
 *
 * @apiSuccess {String} username User of the token
 * @apiSuccess {String} token Token that allow to identify the user for the request
 * 
 * @apiSuccessExample {json} Token Returned
 *     HTTP/1.1 200 {
 *      {
 *          "username" : "John",
 *          "token" : <AutologinToken>
 *      }
 *
 */
