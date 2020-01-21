/**
 * @api {get} /getAccessToken get the access token associated to a service
 * @apiName Get Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to get the associated access token
 *
 * @apiSuccess (Response Headers) {String} serviceToken (Checker si la réponse contient un T majuscule) access token
 *
 * @apiSuccessExample GetToken
 *     HTTP/1.1 200 OK
 *      headers: {
 *          serviceToken : <Access Token>
 *      }
 *      "Success"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/


 /**
 * @api {POST} /addAccessToken Add an access token an his service
 * @apiName Add Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to get the associated Access Token
 * @apiParam (Request headers) {String} value The value of the Access Token
 *
 * @apiSuccessExample Token Added
 *     HTTP/1.1 200 OK
 *      "Service <Service Name> added"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse EmptyAccessToken
 * @apiUse NoService
 **/

  /**
 * @api {PUT} /updateAccessToken update the Access Token associated to a service
 * @apiName Update Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to update
 * @apiParam (Request headers) {String} value The new value for the Access Token
 *
 * @apiSuccessExample Token Updated
 *     HTTP/1.1 200 OK
 *      "Service <Service Name> updated"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse EmptyAccessToken
 * @apiUse NoService
 **/

   /**
 * @api {DELETE} /removeAccessToken remove a service and his Access Token
 * @apiName Remove Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to delete
 *
 * @apiSuccessExample Token Updated
 *     HTTP/1.1 200 OK
 *      "Service <Service Name> deleted"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/

