const expect = require('chai').expect,
assert = require('chai').assert,
appRoot = require('app-root-path'),
path = require('path'),
repogitData = require(appRoot+"/app/data/repogitData") , 
gitProj = require('./data/git_test.json')



describe("repogitData test", function() {

	var self = this
	before(function(){

		self.dirExpected = gitProj.dirProj 
		self.projPath = path.join(appRoot.toString(), 'test', 'git_test')
		self.testClone = path.join(appRoot.toString(), 'test', 'git_to_clone')

	})
	it("Should return correct repodirs with git", function(done) { 
		repogitData.getRepoDirs(self.projPath, function(err, repos) {
			expect(err).to.be.null
			expect(repos).to.be.eql(self.dirExpected) 
			done()

		})
	})

	it("Should return an error if path doesn't exists", function(done) { 
			repogitData.getRepoDirs("impossibletoexiststhispath", function(err, repos) {
				console.log(err)	
				expect(err).not.to.be.null
				done()
			})		

	})
	it("Clone test: should clone a public repo", function() { 
		this.timeout(10000)
		return repogitData.clone("https://github.com/giper45/repogitjs", path.join(self.testClone, "repogi_test") )
		.then(function success(response) {
			assert(response != null , "Success")
		},
			function error(response) {
				assert(response == null, "Failure")
		})
	})


})
