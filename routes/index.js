var path = require('path');
var fs = require('fs');
var encrypt = require(path.join(__dirname, '../utils/savhandler.js')).encrypt;
var decrypt = require(path.join(__dirname, '../utils/savhandler.js')).decrypt;


var Index = function(app, busboy) {

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../views','index.html'));
    });
	
	app.get('/content', function(req, res) {
        res.sendFile(path.join(__dirname, '../views','index.html'));
    });
	
	app.post('/upload', function(req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //temp dir of the files
            fstream = fs.createWriteStream(path.join(__dirname, '../files/' + filename));
            file.pipe(fstream);
            fstream.on('close', function() {
				//redirect nem megy mert angular nem engedi az url-t megvaltoztatni
                res.redirect('/sendVault');
            });
        });
    });
	
	app.get('/sendVault', function(req, res) {
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
		
		//Elküldi de nem fog az url megvaltozni itt lehetne elkuldeni dekodolt jsont.
        res.send(JSON.parse(decrypted));
    });

};

exports.Index = Index;