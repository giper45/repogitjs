var repogit_ctrl = function($scope, $http, $log, Notification, $uibModal) {

	//Scope variables 
	$scope.namerepo = ''
	$scope.giturl = ''
	$scope.repos = []

	$scope.authRequired = false
	$scope.username = ""
	$scope.password = ""
	$scope.mail = ""
	$scope.commit = ""
	$scope.selectedRepo = ""


	$log.log("in repogit")
	init() 

	function logError(errorResponse) {
			Notification('Error : '+errorResponse.data.message, "error")
	}	


	function success(data) {
		Notification( "Success!" , "success")

	}


	$scope.selectRepo  = function(reponame ) {
		$scope.selectedRepo = reponame
		

	}
	//Clone repo
	$scope.loadRepo = function() {
		//TODO check values
		var urlClone = "/repogit/v1/repos/"+$scope.namerepo
		var bodyRequest = {
					giturl:$scope.giturl, 
					authRequired : $scope.authRequired,
					username : $scope.username,
					password : $scope.password
				}
			

		$http.post(urlClone, bodyRequest) 
			.then(
				function(data) {
					$scope.repos.push($scope.namerepo)
				}
				, logError)



	} 

	$scope.pullRepo = function(reponame) {

		var urlRepo = '/repogit/v1/repos/'+reponame
		$http.get(urlRepo) 
			.then(success, logError)
	} 


	$scope.pushRepo = function(reponame) {
	     var urlRepo = '/repogit/v1/repos/'+reponame
	     var bodyRequest = {
				username : $scope.username,
				mail : $scope.mail,
				commit : $scope.commit
			}
		
		console.log("urlRepo:") 
		console.log(urlRepo) 

		//Call put method 
		$http({ 
			method: "PUT",
			headers: { 'content-type': "application/json;charset=UTF-8"},
			url:urlRepo,
			data: bodyRequest	})
			.then(success, logError)

	}

			


	$scope.openConfirmDelete = function openConfirmDelete(repo) {

		var urlDel = "/repogit/v1/repos/"+ repo
		 var modalInstance = $uibModal.open({
		      component: 'modalComponent',
		      resolve: {
			repo: function () {
			  return repo;
			}
		      }
		    });

		    modalInstance.result.then(

		//Remove repo ok
		function ok() {
				console.log("devo cancellare") 
				$http.delete(urlDel) 
					.then((resp) => {
					      var iToRemove = $scope.repos.indexOf(repo) 
					      if(iToRemove !== -1)
						$scope.repos.splice(iToRemove, 1)

							}, logError) 
			  },
		function noCallback(response) { 
		})

	

	}
	


	function init() {
		$http.get("/repogit/v1/root") 
			.then(function success(response) {
				$log.log("success") 
				 $scope.rootDir = response.data.data
				loadRepos() 
			}, 
			     function errorResponse(errorResponse) {
				logError(errorResponse)
			}) 
	}

	function loadRepos() {
	  $http.get("/repogit/v1/repos") 
		.then(function success(response) {
			$scope.repos = response.data.data
		},
		function error(response) {
			logError(response)
		})



	}



}
