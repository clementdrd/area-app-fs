/**
 * @api {post} /login Log an User
 * @apiName Login
 * @apiGroup UserManagement
 *
 * @apiParam (Request Body) {String} username username of the account
 * @apiParam (Request Body) {String} password Password of the account
 * @apiSuccess (Response Headers) {String} userToken token for the authorization
 *     
 * @apiSuccessExample User Loged
 *     HTTP/1.1 200 OK
 *     headers : { userToken : <token> }
 *     "User connected!"
 *
 * @apiUse UserLoginError
 * @apiUse EmptyField
 */

/**
* @api {post} /register Register a User
* @apiName Register
* @apiDescription Create an account for the user
* @apiGroup UserManagement
*
* @apiParam (Request Body) {String} username Username of the new user
* @apiParam (Request Body) {String} password Password of the new user
* @apiParam (Request Body) {String} email Email to associate with the account
*
* @apiSuccess (Response Headers) {String} userToken token for the authorization
* @apiSuccessExample {String} Account created
*     HTTP/1.1 200 OK
*     headers : { userToken : <token> }
*     "Account created"
*
* @apiUse UserRegistrationError
*/

/**
* @api {delete} /deleteUser Delete a User
* @apiName Delete Account
* @apiDescription delete an User account
* @apiGroup UserManagement
*
* @apiParam (Request Body) {String} userToken Token of the account to delete
* @apiParam (Request Body) {String} username username of the account to delete
*
* @apiSuccessExample {String} User Deleted
*     HTTP/1.1 200 OK
*      "User John deleted"
*
* @apiUse FalseToken
* @apiUse WrongToken
* @apiUse EmptyField
*/
