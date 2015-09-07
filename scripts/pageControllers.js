app.controller('bodyController',['$scope', function($scope) {
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope','VaultData', function($scope,VaultData) {
	//VaultData.getVault() contains the decrypted sav as a json
	$scope.message = VaultData.getVault();
	console.log('/content opened')
	console.log('Dwellers: ',getDwellers(VaultData.getVault()))
}]);
