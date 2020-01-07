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
 *     "Password doesn't match"
 *
 * @apiError EmptyFields Either the username or the password as been sent as empty
 *
 * @apiErrorExample {String} Empty Fields
 *     HTTP/1.1 400 Bad Request
 *     "You can't send an empty field"
 */

/**
 * @apiDefine UserRegistrationError
 *
 * @apiError UserExist The Username is already taken
 *
 * @apiErrorExample {String} Cant Update
 *     HTTP/1.1 400 Bad Request
 *     "User John already exist"
 *
 * @apiError EmailExist The Email is already associated to an account
 *
 * @apiErrorExample {String} Email Exist
 *     [TO DO] HTTP/1.1 400 Bad Request
 *     "An email is already associate with an account"
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
 * @apiGroup UserManagement
 *
 * @apiParam {String} username username of the account (in the body)
 * @apiParam {String} password Password of the account (In the body)
 *
 * @apiSuccessExample User Loged
 *     HTTP/1.1 200
 *      "User John Created"
 *
 * @apiUse UserLoginError
 */

/**
* @api {post} /register Register a User
* @apiDescription Create an account for the user
* @apiGroup UserManagement
*
* @apiParam {Number} username (In the body) Username of the user
* @apiParam {String} password (In the body) Password of the user
* @apiParam {String} email [TO DO] (In the body) Email to associate with the account
*
* @apiSuccessExample {String} User John connected
*     HTTP/1.1 200
*      "Account created"
*
* @apiUse UserRegistrationError
*/

/**
* @api {delete} /deleteUser Delete a User
* @apiDescription delete an User account
* @apiGroup UserManagement
*
* @apiParam {String} token User own token
*
* @apiSuccessExample {String} User Deleted
*     HTTP/1.1 200
*      "User John deleted"
* @apiuse UserDeleteError
*/
