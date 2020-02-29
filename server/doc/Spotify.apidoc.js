/**
 * @api {get} /spotifyresume Resume of the week
 * @apiDescription Get resume of the top 10 artists of the week by Email
 * @apiName Resume
 * @apiGroup Spotify
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/

 /**
  * @api {get} /spotifyhistory Set up an history of listened Music
  * @apiDescription Listening to a music will either like it, follow the artist or find one of his concert
  * @apiName History
  * @apiGroup Spotify
  *
  * @apiParam (Request headers) {String} usertoken The token that belongs to the user
  * @apiParam (Request headers) {String} mode "like" - "follow" - "concert" 
  *
  * @apiUse Activated
  * @apiUse Unauthorized
  * @apiUse BadRequest
  * 
  **/