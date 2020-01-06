/**
 * @apiDefine NotAdminError
 *
 * @apiError not Admin The token passed as parameter is not an admin one
 *
 * @apiErrorExample not Admin
 *     HTTP/1.1 403 Forbidden
 *     "Your not an admin"
 */

/**
 * @api {get} /user/:token Get list of all Users
 * @apiGroup Admin
 *
 * @apiParam {Number} token Must be an admin token
 *
 *
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} email  Email associated to the account of the User.
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 {
 *      {"username": "John", email : "doe@known.unknown"},
 *      ...
 *      }
 *
 * @apiUse NotAdminError
 */
