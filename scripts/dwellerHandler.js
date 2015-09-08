//Returns every dweller from the Vault with unique id
//data: entire SAV (decrypted SAV)
var getDwellers = function (data) {
	console.log('getDwellers - data',data);
	dwellers = [];
	if (data) {
		for (var i = 0; i < data['dwellers']['dwellers'].length; i++) {
			dweller = {};
			dweller['serializeId'] = data['dwellers']['dwellers'][i]['serializeId'];
			dweller['attributes'] = {
				'name' : data['dwellers']['dwellers'][i]['name'],
				'lastName' : data['dwellers']['dwellers'][i]['lastName']
			};
			console.log(dweller);
			dwellers.push(dweller);
		}
	}
	console.log('getDwellers',dwellers);
	return dwellers;
};

//Sets a dweller's name and lastName attribute.
//dwellers: result of getDwellers (all dweller in the vault)
//id: unique serializeId of the dweller
//name, lastName: new first name, last name
var setDwellerName = function (dwellers, id, name, lastName) {
	for (var i = 0; i < dwellers.length; i++) {
		if(dwellers[i]['serializeId'] == id){
			dwellers[i]['attributes']['name'] = name;
			dwellers[i]['attributes']['lastName'] = lastName;
		}
	}
};

//Inserts dwellers into data
//data: entire SAV
//dwellers: modified dwellers
var saveDweller = function (data, dwellers) {
	if (data && dwellers) {
		for (var i = 0; i < data['dwellers']['dwellers'].length; i++) {
			if(data['dwellers']['dwellers'][i]['serializeId'] == dwellers[i]['serializeId']){
				data['dwellers']['dwellers'][i]['name'] = dwellers[i]['attributes']['name'];
				data['dwellers']['dwellers'][i]['lastName'] = dwellers[i]['attributes']['lastName'];
			}
		}
	}
	return data;
}