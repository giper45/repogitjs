const helpers = require('./helpers') , 
	path = require('path'),
	appRoot = require('app-root-path') , 	
	homedir = require('homedir')
	repoConfig = require(appRoot+"/config/repoconf.json"),
	repogitData = require(appRoot+"/app/data/repogitData")
	async = require('async')


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
				else if (!req.body || !req.body.giturl) 
					cb(helpers.bodyNoCorrect(['giturl']))
				else 
				{
				var reponame = req.params.reponame
				var giturl = req.body.giturl
				//TODO Checks in parameters 


				cb(null, {reponame:path.join(homedir(),repoConfig.rootDir, reponame), giturl:giturl})
				}
			}, 
			//Git clone
			function(params, cb) {

				repogitData.clone(params.giturl, params.reponame).then(
				function success(repository)	
				{
					console.log("success")
					cb(null)	
				},
				function error(e)	
				{
					console.log("error")
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

	}
	


}


module.exports = api
