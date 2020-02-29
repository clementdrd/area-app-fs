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
* @apiDefine WrongToken
*
* @apiError NotAllowed The token and the username doesn't belongs to the same account
*
*  @apiErrorExample {String} Not Allowed
*  HTTP/1.1 403 Forbidden
*   "You are not allowed to modify another user account"
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
 * @apiDefine FalseToken
 *
 * @apiError  FalseToken The token you sent doesn't match any account in the database
 *
 * @apiErrorExample {String} False Token
 *     HTTP/1.1 403 Forbidden
 *     "You are not allowed to do this request"
 */

/**
 * @apiDefine NoService
 *
 * @apiError  NoService This service was not associated to the user
 *
 * @apiErrorExample {String} No Service
 *     HTTP/1.1 422 Unprocessable Entity
 *     "The service <Service Name> has not been initiated for this user"
 */

 /**
  * @apiDefine Unauthorized
  *
  * @apiError  Unauthorized The user was not authorized to perform the request
  *
  * @apiErrorExample {String} Unauthorized
  *     HTTP/1.1 401 Unauthorized
  *     "Unauthorized"
  */

  /**
   * @apiDefine BadRequest
   *
   * @apiError  BadRequest The method use was not the right one
   *
   * @apiErrorExample {String} Bad Request
   *     HTTP/1.1 400 Bad Request
   *     "Bad Request"
   */

 /**
 * @apiDefine EmptyAccessToken
 *
 * @apiError  EmptyAccessToken The access token is empty or undefined
 *
 * @apiErrorExample {String} Empty Access Token
 *     HTTP/1.1 400 Bad Request
 *     "You can't put an empty value for the Access Token"
 */


