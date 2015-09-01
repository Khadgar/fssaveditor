var path = require('path');
var fs = require('fs');
var encrypt = require(path.join(__dirname, '../utils/savhandler.js')).encrypt;
var decrypt = require(path.join(__dirname, '../utils/savhandler.js')).decrypt;


var Index = function(app) {

    app.get('/', function(req, res) {
		console.log('Reading original: Vault1.sav');
		var file = fs.readFileSync(path.join(__dirname, '../files/Vault1.sav'), "utf8");
		// The content is in base64
		var base64text = new Buffer(file,'base64');
		// Decrypting
		console.log('Decrypting Vault1.sav');
		var decrypted = decrypt(base64text).toString()
		fs.writeFileSync(path.join(__dirname, '../files/DEC_Vault1.sav'), decrypted);
		// Encrypting back
		console.log('Reencrypting DEC_Vault1.sav');
		var encrypted = encrypt(decrypted)
		console.log('Write encrypted result Vault1.sav');
		fs.writeFileSync(path.join(__dirname, '../files/NEW_Vault1.sav'), encrypted);
		
        res.send('FOS sav editor');
    });

};

exports.Index = Index;