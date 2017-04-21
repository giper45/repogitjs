var repogit_ctrl = function($scope, $http, $log, Notification) {

	//Scope variables 
	$scope.namerepo = ''
	$scope.giturl = ''
	$scope.repos = []


	$log.log("in repogit")
	init() 

	$scope.loadRepo = function() {
		//TODO check values
		$http.post("/repogit/v1/repos/"+$scope.namerepo, {giturl:$scope.giturl})
			.then(
			function successCallback(response) {
				console.log("success clone")
				Notification( "Success!" , "success")
				 console.log(response.data)
			}, 
			function errorCallback(errorResponse) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
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


	function logError(errorResponse) {
			Notification('Error : '+errorResponse.data.message, "error")
	}	

	}



}
