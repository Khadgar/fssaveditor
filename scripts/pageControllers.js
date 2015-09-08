app.controller('bodyController',['$scope', function($scope) {
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope','VaultData', function($scope,VaultData) {
	//VaultData.getVault() contains the decrypted sav as a json
	var SAVDATA = VaultData.getVault();
	var dwellers = getDwellers(SAVDATA);
	console.log('dwellers: ',dwellers)
	//set new first name and last name to a dweller
	setDwellerName(dwellers,1,'Dani','Dani');
	//insert the modified dweller/dwellers into the decrypted SAV
	VaultData.setVault(saveDweller(SAVDATA,dwellers));
	//display new dwellers
	$scope.message = getDwellers(SAVDATA);
	//display the content of the sav on console
	console.log('Modded Dwellers: ',VaultData.getVault())
}]);
