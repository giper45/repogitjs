var repogit_ctrl = function($scope, $http, $log, Notification) {

	//Scope variables 
	$scope.namerepo = ''
	$scope.giturl = ''
	$scope.repos = []

	$scope.authRequired = false
	$scope.username = ""
	$scope.password = ""


	$log.log("in repogit")
	init() 

	function logError(errorResponse) {
			Notification('Error : '+errorResponse.data.message, "error")
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
			function successCallback(response) {
				console.log("success clone")
				Notification( "Success!" , "success")
				 console.log(response.data)
			}, 
			function errorCallback(errorResponse) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
				console.log("error clone")
				logError(errorResponse)
			  });



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
