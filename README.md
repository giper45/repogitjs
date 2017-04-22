# repogitjs
A javascript api and bootstrap interface to manage github repositories with basic operations (commit, pull, push, ...) inside a root directory defined by user.  It provides : 
* A node RestFul API to send pull / add+commit+push / clone request to repositories  
* A simple angular+bootstrap web interface  that shows the api functionality 


## Getting Started

```
git clone https://github.com/giper45/repogitjs.git
```
Once you've download the repo run 
```
npm install 
```
to download dependencies. Then in the **repoconf.json** file (located inside the **config**  directory), set the path for the "root dir" that is the directory where all git repos will be saved: 
```
{
  "rootDir": "set you path"
}
```
*The rootDir will be created by starting from the **home user directory***.    
Then runs the server

```
node index.js 
```

Now go to http://localhost:port and try it ! 

### Prerequisites

* Git-client installed on your pc 
* node v4.2.6 or above   
* npm 2.14.12 or above   



### API Examples 

A Node API is provided with the project. Look at the test/api_test.js for the examples : 


* Clone a repo : ` POST repogit/v1/repos/:reponame  body : {giturl:"remoteGitUrl"} `  
* Clone a repo that needs auth : `POST repogit/v1/repos/:reponame body : {giturl:"remoteGitUrl", username:"username", password:"password"}` 

* Pull request : GET repogit/v1/repos/:reponame  
* Push request : PUT repogit/v1/repos/:reponame  body : {commit:"messageCommit", username:"username", mail:"Mail username" } 


 
 

## Running the tests

In order to run test you have to set 2 files inside the **test/data** directory : 
**git_test.json** and **private.json** . 
There are examples of their format inside the test directory (*git_test_ex.json* and *private_ex.json* : you can copy it inside the data dir. 
``` 
{
        "user" : { 
                        "username" : "username",
                        "password" : "password" 
                } , 
        "cloneExample": "http://toclone",
        "cloneWithAuth" : "http://tocloneWithAuth" 


}
```

After you've done this you can run tests with : 

``` 
mocha test --timeout 8000
```
 
## Contributing 

* Fork it!
* Create your feature branch: git checkout -b my-new-feature
* Commit your changes: git commit -am 'Add some feature'
* Push to the branch: git push origin my-new-feature
* Submit a pull request :D




