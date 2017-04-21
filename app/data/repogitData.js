const Walker = require('walker'), 
	pathExists = require('path-exists'), 
	path = require('path'),
	fs= require('fs'),
	NodeGit = require('nodegit') ,
	process = require('process'),
	backhelp = require('./backend_helpers'),
	rimraf = require('rimraf'),
	_= require('underscore'),
	simpleGit = require('simple-git'),
	strings = require('help-nodejs').strings
	Q= require('q')

function haveToFilter(baseDir, dir) {
                var re = new RegExp(baseDir+'/?([^/]+/?){0,1}$');
                return re.test(dir);
}

const maxAttempts = 2

var invalidAuthString  = "Invalid username or password"
var failAuthError = new Error("Auth failed") 
failAuthError.code= -2


module.exports = {
	clone: function(giturl, params) {
	var numAttempts = 0
	var cloneOptions = {} ,
	url = this.getGitUrl(giturl, params)  

		
		var deferred = Q.defer()
			//Redirect stdout to /dev/null in order to show auth password on console 
			simpleGit().silent(false).clone(url, params.reponame,['-q'], function(err, data) {
				if(err)
				{
					//If find invalidAuth String
					if(err.includes(invalidAuthString)) 
					{
						toRemove = strings.substring(err, invalidAuthString)
						err = strings.remove(err, toRemove) 
					}
						deferred.reject(new Error(err))

				}
				else deferred.resolve(data)
			})


		return deferred.promise	
	},

	getRepoDirs : function(nameRepo,callback) {
		var repoRet = [] 
		//Check error
		if(!pathExists.sync(nameRepo) )
		{
			callback(backhelp.file_not_exists(nameRepo))
		}
		else {
	 	Walker(nameRepo) 
			.filterDir(function(dir, stat) {
				return haveToFilter(nameRepo,dir)
			})
			.on('dir', function(dir, stat) {
				var gitFile = path.join(dir, '.git')
				if(pathExists.sync(gitFile))
							repoRet.push(path.basename(dir))	
				})	


			.on('end', function() {
				//Sort by name 
				var repos = _.sortBy(repoRet, function(e) {return e})
				callback(null, repos)
			})
		}

	},

	getGitUrl(url, params) {

		var username = (params && params.username) ? params.username  : 'git'
		var password = (params && params.password) ? params.password : 'git'
		
		var inside = strings.substring(url, "//", "@")		
		if(inside !== "")
		{
			url = strings.remove(url, inside)
			//Remove inside params
			//Add after // 
			url = strings.add(url, username+":"+password, "//")
		}
		//It doesn't contain a username 
		else 
			url = strings.add(url, username+":"+password+ "@", "//")

		return url
	}


	}

