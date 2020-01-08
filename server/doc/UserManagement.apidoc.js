/**
 * @apiDefine UserLoginError
 *
 * @apiError DoesntExist The account doesn't exists in the database
 *
 * @apiErrorExample {String} Doesnt Exist
 *     HTTP/1.1 400 Bad Request
 *     "This account doesn't exist"
 *
 * @apiError BadPassword The password doesn't match with the one stored for this account
 *
 * @apiErrorExample {String} Bad Password
 *     HTTP/1.1 400 Bad Request
 *     "Passwords doesn't match"
 *
 **/
 /**
 * @apiDefine EmptyField
 *
 * @apiError EmptyFields You sent an empty field
 *
 * @apiErrorExample {String} Empty Fields
 *     HTTP/1.1 400 Bad Request
 *     "You can't send an empty field"
 */

/**
 * @apiDefine UserRegistrationError
 *
 * @apiError UserAlreadyExist The Username is already taken
 *
 * @apiErrorExample {String} User already exist
 *     HTTP/1.1 400 Bad Request
 *     "User John already exist"
 *
 * @apiError EmptyField You sent an empty field either in the username, password or email
 *
 * @apiErrorExample {String} Empty Field
 *     HTTP/1.1 400 Bad Request
 *     "You can't send an empty field"
 */

/**
 * @apiDefine UserDeleteError
 *
 * @apiError  CantFindAccount The account to delete cannot be found
 *
 * @apiErrorExample {String} Cant Find Account
 *     HTTP/1.1 400 Not Modified
 *     "Could not find the account"
 *
 * @apiError  EmptyAccountField The account can't have an empty username
 *
 * @apiErrorExample {String} Cant Find Account
 *     HTTP/1.1 400 Not Modified
 *     "You can't send an empty username"

 */

/**
 * @api {post} /login Log an User
 * @apiName Login
 * @apiGroup UserManagement
 *
 * @apiParam (Request body) {String} username username of the account
 * @apiParam (Request body) {String} password Password of the account
 *
 * @apiSuccessExample User Loged
 *     HTTP/1.1 200 OK
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
* @apiParam (Request body) {String} username Username of the new user
* @apiParam (Request body) {String} password Password of the new user
* @apiParam (Request body) {String} email Email to associate with the account
*
* @apiSuccessExample {String} Account created
*     HTTP/1.1 200 OK
*      "Account created"
*
* @apiUse UserRegistrationError
* @apiUse EmptyField
*/

/**
* @api {delete} /deleteUser Delete a User
* @apiName Delete Account
* @apiDescription delete an User account
* @apiGroup UserManagement
*
* @apiParam (Request body) {String} token Token of the account to delete
* @apiParam (Request body) {String} username username of the account to delete
*
* @apiSuccessExample {String} User Deleted
*     HTTP/1.1 200 OK
*      "User John deleted"
* @apiuse UserDeleteError
*/
