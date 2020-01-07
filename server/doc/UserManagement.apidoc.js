/**
 * @apiDefine UserLoginError
 *
 * @apiError DoesntExist The account doesn't exists in the database
 *
 * @apiErrorExample {String} Doesnt Exist
 *     HTTP/1.1 400 Bad Request
 *     "This account doesn't exists"
 *
 * @apiError BadPassword The password doesn't match with the one stored for this account
 *
 * @apiErrorExample {String} Bad Password
 *     HTTP/1.1 400 Bad Request
 *     "Passwords doesn't match"
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
 *     "User John already exists"
 *
 * @apiError EmailExist The Email is already associated to an account
 *
 * @apiErrorExample {String} Email Exist
 *     HTTP/1.1 400 Bad Request
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
 * @apiError AnotherAccount The account to delete wasn't matching with the user own access_token
 *
 * @apiErrorExample {String} Another Account
 *     HTTP/1.1 403 Forbidden
 *     "You can only delete your account"
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
* @apiParam {String} email (In the body) Email to associate with the account
*
* @apiSuccessExample {String} User Created
*     HTTP/1.1 200
*      "Account created"
*
* @apiUse UserRegistrationError
*/

/**
* @api {delete} /user/:email/:token Delete a User
* @apiDescription delete an User account
* @apiGroup UserManagement
*
* @apiParam {String} token User own token
* @apiParam {String} email email of the account to delete
*
* @apiSuccessExample {String} User Deleted
*     HTTP/1.1 200
*      "User deleted"
* @apiuse UserDeleteError
*/
