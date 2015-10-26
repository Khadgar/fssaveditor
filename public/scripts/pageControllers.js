app.controller('bodyController',['$scope', function($scope) {
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope','$http','VaultData', function($scope,$http,VaultData) {
	//VaultData.getVault() contains the decrypted sav as a json
	var SAVDATA = VaultData.getVault();
	var dwellers = getDwellers(SAVDATA);
	//Usage
	//--------------------------------------------------------------
	//set new first name and last name to a dweller
	//setDwellerName(dwellers,10,'Dani','Dani');
	//set new SPECIAL values to dweller 10
	//setDwellerSpecial(dwellers,10,9,9,9,9,9,9,9);
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
	$scope.save = function (dwellers, lunchboxes, mrhandy, caps) {
		VaultData.setVault(saveDweller(SAVDATA, dwellers, lunchboxes, mrhandy, caps));
		console.log('Modded Dwellers: ', VaultData.getVault());
		$http({
			url : '/sendSAV',
			method : "POST",
			headers : {'Content-Type' : 'application/json'},
			data : {'SAV' : VaultData.getVault()}
		}).success(function (response) {
			console.log("success");
			var blob = new Blob([response]);
			saveAs(blob, "Modded_Vault1.sav");
		}).error(function (response) {
			console.log("error");
			console.log(response);
		});
	}
	
	$scope.maximize = function (dweller) {
		dweller.attributes.Strength     = 10;
		dweller.attributes.Perception   = 10;
		dweller.attributes.Endurance    = 10;
		dweller.attributes.Charisma     = 10;
		dweller.attributes.Intelligence = 10;
		dweller.attributes.Agility      = 10;
		dweller.attributes.Luck         = 10;
		dweller.attributes.LvL         = 50;
	}
}]);
