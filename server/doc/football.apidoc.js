/**
 * @api {get} /premier_league_schedule_sms FootballStandings - SMS
 * @apiDescription Send SMS about the standings in the premiere League
 * @apiName StandingToSms
 * @apiGroup Football
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/

/**
 * @api {get} /upcoming_match UpcommingMatch - SMS
 * @apiDescription Get all match that will occurs in the following 7days, and =send them by SMS
 * @apiName MatchToSms
 * @apiGroup Football
 *
 *
 * @apiParam (Request headers) {String} usertoken The token that belongs to the user
 *
 * @apiUse Activated
 * @apiUse Unauthorized
 * 
 **/