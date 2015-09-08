//Returns every dweller from the Vault with unique id
//data: entire SAV (decrypted SAV)
var getDwellers = function (data) {
	if (data) {
		var dwellers = {};
		for (var i = 0; i < data['dwellers']['dwellers'].length; i++) {
			dwellers[data['dwellers']['dwellers'][i]['serializeId']] = {
				'name' : data['dwellers']['dwellers'][i]['name'],
				'lastName' : data['dwellers']['dwellers'][i]['lastName'],
				'serializeId' : data['dwellers']['dwellers'][i]['serializeId']
			};
		}
	}
	return dwellers
};

//Sets a dweller's name and lastName attribute.
//dwellers: result of getDwellers (all dweller in the vault)
//id: unique serializeId of the dweller
//name, lastName: new first name, last name
var setDwellerName = function (dwellers, id, name, lastName) {
	
	if (dwellers[id]) {
		dwellers[id] = {
			'name' : name,
			'lastName' : lastName
		};
	}
};

//Inserts dwellers into data
//data: entire SAV
//dwellers: modified dwellers
var saveDweller = function (data, dwellers) {
	if (data && dwellers) {
		for (var i = 0; i < data['dwellers']['dwellers'].length; i++) {
			if(data['dwellers']['dwellers'][i]['serializeId'] == (i + 1)){
				data['dwellers']['dwellers'][i]['name'] = dwellers[i + 1]['name'];
				data['dwellers']['dwellers'][i]['lastName'] = dwellers[i + 1]['lastName'];
			}
		}
	}
	return data;
}