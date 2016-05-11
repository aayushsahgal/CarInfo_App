function AppCtrl($scope ,$http) {
	console.log("Hello World from controller");
	
	// Getting all the car information when the page loads
	var refresh= function() {
		$http.get('/api/car').success(function(response) {
			console.log("I got the data");
			$scope.carlist = response;
			$scope.car="";
		});
	};

	refresh(); // refreshes our page whenever a CRUD operation is performed by user

	// Adding new car to our page
	$scope.addCar = function() {
		console.log($scope.car);
		$http.post('/api/car', $scope.car).success(function(response) {
			console.log(response);
			refresh();
		});
	};

	// Removing a car from our page
	$scope.remove= function(id) {
		console.log(id);
		$http.delete('/api/car/' + id).success(function(response){
			refresh();
		});
	};

	// Editing a car information
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/api/car/' + id).success(function(response){
			$scope.car= response;

		});
	};

	// Updating the edited car information
	$scope.update = function() {
		console.log($scope.car._id);
		$http.put('/api/car/' + $scope.car._id, $scope.car).success(function(response) {
			refresh();
		});
	};

	// Clearing the editing field scopes
	$scope.clear= function() {
		$scope.car="";
	}
}