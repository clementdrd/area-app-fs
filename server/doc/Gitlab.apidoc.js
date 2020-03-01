/**
 * @api {get} /trelloGitlabOrga TrelloOrga - GitlabOrga
 * @apiDescription Create Trello organisation based on Gitlab teams in which the user is
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
 * @api {get} /gitlabTrelloOrga GitlabOrga - TrelloOrga
 * @apiDescription Create Gitlab teams based on the trello Organisations in which the user is
 * @apiName GitlabToTrello
 * @apiGroup Trello
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/