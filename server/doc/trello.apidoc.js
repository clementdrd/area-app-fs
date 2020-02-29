/**
 * @api {get} /trelloGitlab Trello - Gitlab
 * @apiDescription create gitlab project from existing trello board
 * @apiName TrelloToGitlab
 * @apiGroup Trello
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/

/**
 * @api {get} /gitlabTrello Gitlab - Trello
 * @apiDescription Create Trello boards based on gitlab existing projects
 * @apiName GitlabToTrello
 * @apiGroup Gitlab
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/