var getDwellers = function(data) {
	var dwellerList = [];
	var dweller = {};
	for(var i = 0;i<data['dwellers']['dwellers'].length;i++){
		dweller['serializeId'] = data['dwellers']['dwellers'][i]['serializeId'];
		dweller['name'] = data['dwellers']['dwellers'][i]['name'];
		dweller['lastName'] = data['dwellers']['dwellers'][i]['lastName'];
		dwellerList.push(dweller);
	}
	return dwellerList
};
