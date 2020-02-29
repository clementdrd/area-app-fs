
/**
 * @api {get} /isonline Check if API is up
 * @apiName IsOnline
 * @apiGroup Basic commands
 *
 * @apiSuccessExample Online
 *     HTTP/1.1 200 OK
 *      "Online"
 **/

/**
 * @api {get} /<all_non_exiting_route> Return 404
 * @apiName Page not found
 * @apiGroup Basic commands
 *
 * @apiSuccessExample Page not found
 *     HTTP/1.1 404
 *      "404 page not found"
 */

 /**
  * @apiDefine Activated
  *
  * @apiSuccess Activated This AREA has been activated
  *
  * @apiSuccessExample {String} Activated
  *     HTTP/1.1 200 OK
  *     "Activated"
  */