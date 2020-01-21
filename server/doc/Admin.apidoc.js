/**
 * @api {delete} /deleteUser Delete user as admin
 * @apiName Delete User
 * @apiGroup Admin commands
 *
 * 
 * @apiParam (Request Body) {String} username username of the admin account
 * @apiParam (Request Body) {String} token Token admin
 * @apiParam (Request Body) {String} userToDelete Username of the account to delete
 * 
 * @apiSuccessExample Online
 *     HTTP/1.1 200 OK
 *      "User John deleted by admin"
 * 
 * @apiUse FalseToken
 * @apiUse EmptyField
 **/