/**
 * @api {get} /getAccessToken Get Access Token
 * @apiDescription Get the access token associated to a service
 * @apiName Get Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to get the associated access token
 *
 * @apiSuccess (Response Headers) {String} servicetoken access token
 *
 * @apiSuccessExample GetToken
 *     HTTP/1.1 200 OK
 *      headers: {
 *          servicetoken : <Access Token>
 *      }
 *      "Token returned in the headers"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/

 /**
 * @api {get} /getAllServices Get service list
 * @apiDescription Get a list of all service, existing for this user
 * @apiName Get Service List
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiSuccess ServiceName The name of the service
 * @apiSuccess Service Each existing service is in the array
 *
 * @apiSuccessExample GetToken
 *     HTTP/1.1 200 OK
 *     {
 *          Service: [<Service1>, <Service2>]
 *     }
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/


 /**
 * @api {POST} /addAccessToken Add Access Token
 * @apiDescription Add an Access Token an his service
 * @apiName Add Access Token
 * @apiVersion 0.1.0
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request body) {String} usertoken The token that belongs to the user
 * @apiParam (Request body) {String} servicename The name of the service to get the associated Access Token
 * @apiParam (Request body) {String} value The value of the Access Token
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
 * @api {PUT} /updateAccessToken Update Access Token
 * @apiDescription Update the Access Token associated to a service
 * @apiName Update Access Token
 * @apiVersion 0.1.0
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request body) {String} usertoken The token that belongs to the user
 * @apiParam (Request body) {String} servicename The name of the service to update
 * @apiParam (Request body) {String} value The new value for the Access Token
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
 * @api {DELETE} /removeAccessToken Remove a Service
 * @apiDescription Remove a service and his Access Token
 * @apiName Remove Access Token
 * @apiVersion 0.1.0
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request body) {String} usertoken The token that belongs to the user
 * @apiParam (Request body) {String} servicename The name of the service to delete
 *
 * @apiSuccessExample Token Updated
 *     HTTP/1.1 200 OK
 *      "Service <Service Name> deleted"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/

/**
 * @api {get} /imgurnasadaily Activate Imgur + Nasa service
 * @apiDescription Get the access token associated to a service
 * @apiName Get Access Token
 * @apiGroup AccessTokens
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 * @apiParam (Request headers) {String} servicename The name of the service to get the associated access token
 *
 * @apiSuccess (Response Headers) {String} servicetoken access token
 *
 * @apiSuccessExample GetToken
 *     HTTP/1.1 200 OK
 *      headers: {
 *          servicetoken : <Access Token>
 *      }
 *      "Token returned in the headers"
 *
 * @apiUse FalseToken
 * @apiUse EmptyField
 * @apiUse NoService
 **/