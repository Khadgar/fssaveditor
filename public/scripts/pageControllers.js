app.controller('bodyController',['$scope', function($scope) {
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope','$http','VaultData', function($scope,$http,VaultData) {
	//VaultData.getVault() contains the decrypted sav as a json
	var SAVDATA = VaultData.getVault();
	var dwellers = getDwellers(SAVDATA);
	//set new first name and last name to a dweller
	setDwellerName(dwellers,10,'Dani','Dani');
	//set new SPECIAL values to dweller 10
	setDwellerSpecial(dwellers,10,9,9,9,9,9,9,9);
	//insert the modified dweller/dwellers into the decrypted SAV
	//VaultData.setVault(saveDweller(SAVDATA,dwellers));
	//display new dwellers
	$scope.dwellerContainer = getDwellers(SAVDATA);
	//display the content of the sav on console
	//console.log('Modded Dwellers: ',VaultData.getVault())
	
	
	$scope.eEditable = false;
	$scope.lostFocus = function () {
		$scope.eEditable = false;
	}
	$scope.onFocus = function () {
		$scope.eEditable = true;
	}
	$scope.save = function (dwellers) {
		VaultData.setVault(saveDweller(SAVDATA, dwellers));
		console.log('Modded Dwellers: ', VaultData.getVault());
		$http({
			url : '/sendSAV',
			method : "POST",
			headers : {'Content-Type' : 'application/json'},
			data : {'SAV': VaultData.getVault()}
		}).success(function (response) {
			console.log("success");
			console.log(response);
			var blob = new Blob([JSON.stringify(response)], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "Vault1.sav");
		}).error(function (response) {
			console.log("error");
			console.log(response);
		});
		}

}]);
