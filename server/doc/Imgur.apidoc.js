/**
 * @api {get} /imgurnasadaily Upload the Nasa picture to Imgur
 * @apiDescription Upload the Nasa picture of the day, to the associated Imgur account
 * @apiName ImgurNasaDaily
 * @apiGroup Imgur
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/

 /**
  * @api {get} /ImgurFavorites Favorite a picture and the owner know it
  * @apiDescription Adding a picture to the favorite puts a comment on the post
  * @apiName FavoriteToComment
  * @apiGroup Imgur
  *
  *
  * @apiParam (Request headers) {String} usertoken The token that belongs to the user
  *
  * @apiUse Unauthorized
  * @apiUse ImgurEnabled
  * @apiUse TokenNotFound
  * 
  **/

  /**
   * @apiDefine TokenNotFound
   *
   * @apiError  TokenNotFound The userToken was not found in the database
   *
   * @apiErrorExample {String} Token Not Found
   *     HTTP/1.1 404 Not Found
   *     "Undefined userToken in tokens collections"
   */

   /**
    * @apiDefine ImgurEnabled
    *
    * @apiSuccess ImgurEnabled The service is enable
    *
    * @apiSuccessExample {String} Imgur Enabled
    *     HTTP/1.1 200 OK
    *     "get Info from the Imgur account"
    */