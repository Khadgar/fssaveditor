//Returns every dweller from the Vault with unique id
//data: entire SAV (decrypted SAV)
var getDwellers = function (data) {
	dwellers = [];
	if (data) {
		for (var i = 0; i < data['dwellers']['dwellers'].length; i++) {
			dweller = {};
			dweller['serializeId'] = data['dwellers']['dwellers'][i]['serializeId'];
			dweller['attributes'] = {
				'name'         : data['dwellers']['dwellers'][i]['name'],
				'lastName'     : data['dwellers']['dwellers'][i]['lastName'],
				'Strength'     : data['dwellers']['dwellers'][i]['stats']['stats'][1]['value'],
				'Perception'   : data['dwellers']['dwellers'][i]['stats']['stats'][2]['value'],
				'Endurance'    : data['dwellers']['dwellers'][i]['stats']['stats'][3]['value'],
				'Charisma'     : data['dwellers']['dwellers'][i]['stats']['stats'][4]['value'],
				'Intelligence' : data['dwellers']['dwellers'][i]['stats']['stats'][5]['value'],
				'Agility'      : data['dwellers']['dwellers'][i]['stats']['stats'][6]['value'],
				'Luck'         : data['dwellers']['dwellers'][i]['stats']['stats'][7]['value']
			};
			dwellers.push(dweller);
		}
	}
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

//Sets a dweller's SPECIAL.
//dwellers: result of getDwellers (all dweller in the vault)
//id: unique serializeId of the dweller
//S,P,E,C,I,A,L are the stats
var setDwellerSpecial = function (dwellers, id, S, P, E, C, I, A, L) {
	for (var i = 0; i < dwellers.length; i++) {
		if(dwellers[i]['serializeId'] == id){
			dwellers[i]['attributes']['Strength'] = S;
			dwellers[i]['attributes']['Perception'] = P;
			dwellers[i]['attributes']['Endurance'] = E;
			dwellers[i]['attributes']['Charisma'] = C;
			dwellers[i]['attributes']['Intelligence'] = I;
			dwellers[i]['attributes']['Agility'] = A;
			dwellers[i]['attributes']['Luck'] = L;
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
				data['dwellers']['dwellers'][i]['stats']['stats'][1]['value'] = dwellers[i]['attributes']['Strength'];
				data['dwellers']['dwellers'][i]['stats']['stats'][2]['value'] = dwellers[i]['attributes']['Perception'];
				data['dwellers']['dwellers'][i]['stats']['stats'][3]['value'] = dwellers[i]['attributes']['Endurance'];
				data['dwellers']['dwellers'][i]['stats']['stats'][4]['value'] = dwellers[i]['attributes']['Charisma'];
				data['dwellers']['dwellers'][i]['stats']['stats'][5]['value'] = dwellers[i]['attributes']['Intelligence'];
				data['dwellers']['dwellers'][i]['stats']['stats'][6]['value'] = dwellers[i]['attributes']['Agility'];
				data['dwellers']['dwellers'][i]['stats']['stats'][7]['value'] = dwellers[i]['attributes']['Luck'];
			}
		}
	}
	return data;
}