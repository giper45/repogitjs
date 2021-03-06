'use strict';

var chai = require('chai'),
 chaiHttp = require('chai-http'),
  appRoot = require('app-root-path'),
  homedir = require('homedir'),
  path = require('path'),
  params = require('./data/private.json') ,
  config = require(appRoot+"/config/repoconf.json"),
   chaiFs = require('chai-fs'),
   _ = require('underscore'),
   expect = chai.expect;

chai.use(chaiHttp)
chai.use(chaiFs)


describe("### API TESTS ###" ,  () => {

var urlBase , server, repoPath
//Before testing choice and empty directory and set these vars 
var cloneExample , cloneWithAuth , username

      before(() => { 
	server ="http://localhost:8080" 
	urlBase = "/repogit/v1/repos/" 
	repoPath = path.join(homedir(), config.rootDir)
	//Before testing choice and empty directory and set these vars 
	cloneExample = params.cloneExample 
	cloneWithAuth = params.cloneWithAuth 
	username = params.user
     })
     //Correct conditions 
     //Clone
    it('should clone a new repo', function (done) {
		chai.request(server) 
			.post(urlBase+"testApiRepo")
			.send({giturl:cloneExample})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				//Check if directory has been created
				expect(path.join(repoPath, "testApiRepo")).to.be.a.path ()
				done()	
				
			})
    });

    //Clone with auth
    it('should clone with auth', (done) => {

    //Update with auth 

     chai.request(server) 
		.post(urlBase+"testAuth")
		.send(_.extend({}, {giturl:cloneWithAuth}, username))
		.end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			console.log("end")
			//Check if directory has been created
			expect(path.join(repoPath, "testAuth")).to.be.a.path()
			done()	
			
		})
    }) ;

    //Delete 
	
    it('should delete', (done) => {

    //Update with auth 
	chai.request(server) 
		.delete(urlBase+"testApiRepo")
		.send()
		.end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			//Check if directory has been created
			expect(path.join(repoPath, "testApiRepo")).to.not.be.a.path ()
			done()	
			
		})

    }) ;
    it('should delete auth', (done) => {

    //Update with auth 
	chai.request(server) 
		.delete(urlBase+"testAuth")
		.send()
		.end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			//Check if directory has been created
			expect(path.join(repoPath, "testApiRepo")).to.not.be.a.path ()
			done()	
			
		})

    }) ;



    //Wrong conditions 
	//TODO

    //Clone and rootDir not setted 



    it("should give an error if I'm not authorized to clone the repo", () => { 


    });




});

