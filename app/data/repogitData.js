const Walker = require('walker'), 
	pathExists = require('path-exists'), 
	path = require('path'),
	fs= require('fs'),
	NodeGit = require('nodegit') ,
	backhelp = require('./backend_helpers'),
	_= require('underscore')

function haveToFilter(baseDir, dir) {
                var re = new RegExp(baseDir+'/?([^/]+/?){0,1}$');
                return re.test(dir);
}


module.exports = {
	clone: function(giturl, namerepo) {
		return  NodeGit.Clone(giturl, namerepo)

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

	}


	}

