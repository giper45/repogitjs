const helpers = require('./helpers') , 
	path = require('path'),
	appRoot = require('app-root-path') , 	
	homedir = require('homedir')
	repoConfig = require(appRoot+"/config/repoconf.json"),
	repogitData = require(appRoot+"/app/data/repogitData")
	async = require('async'), 
	_ = require('underscore') 



var api = {
	getRootDir : function(req, res) {
		var rootDir = repoConfig.rootDir
		helpers.response(res, null, rootDir) 		
	} ,

	//Clone a repo
	cloneRepo : function(req, res) {
		console.log("in clone repo") 

		async.waterfall([
			//Check params
			function(cb)  {
				if(!req.params || !req.params.reponame) 
					cb(helpers.paramError)
				//Check body
				else if (!req.body || !req.body.giturl) 
					cb(helpers.bodyNoCorrect(['giturl']))

				//If authRequired is true check username and password body params
				else if (req.body.authRequired && (!req.body.username || !req.body.password))
					cb(helpers.bodyNoCorrect(['username', 'password']))
				else 
				{
				var reponame = req.params.reponame
				var giturl = req.body.giturl
				//TODO Checks in parameters 

				//Extend params 
				var params = _.extend({} , {reponame:path.join(homedir(),repoConfig.rootDir, reponame)}, req.body)
				cb(null, params)
				}
			}, 
			//Git clone
			function(params, cb) {

				console.log(params)

				var promises =  repogitData.clone(params.giturl, params)
				promises.then(
				function success(repository)	
				{
					console.log("success")
					cb(null)	
				},
				function error(e)	
				{
					/* CANNOT GET THE AUTH ERROR CODE FOR THE MOMENT */
//					//Check for code error 
//					//Need auth error
//					if(e.toString() === errMessages.noAuthInserted)
//					{
//						cb(helpers.authRequired())
//
//					}
					//No special error, simply returns the error 
					//else 
						cb(e)	
				})

			}

		]
		,
		function(err) {
			helpers.response(res,err)
		})	

	} ,
	//Returns 
	getRepos : function(req, res) {

		var rootDir = repoConfig.rootDir
		var rootPath = path.join(homedir(), rootDir)  
		repogitData.getRepoDirs(rootPath, function(err, rootDirs) { 

			helpers.response(res, err, rootDirs)
		})

	},
	pushRepo : function(req, res) {


	}, 
	pullRepo : function(req, res) {
		console.log("pull") 
		helpers.response(res, null, 'ok')
	}
	


}


module.exports = api
