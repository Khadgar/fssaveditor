var path = require('path');
var fs = require('fs');
var encrypt = require(path.join(__dirname, '../utils/savhandler.js')).encrypt;
var decrypt = require(path.join(__dirname, '../utils/savhandler.js')).decrypt;


var Index = function(app, busboy) {

	//minden route-ra az indexet adom vissza -> Alkalmazas restart.
	//Kliensnel statikusan megvan az index.html
	app.get('/content', function(req, res) {
	console.log('/content requested from client');
       res.redirect('/');
    });
	
	//A feltoltest kezeli es sikeres feltoltes eseten visszakuldi a dekodolt sav fajlt a kliensnek
	app.post('/upload', function(req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //temp dir of the files
            fstream = fs.createWriteStream(path.join(__dirname, '../public/files/' + filename));
            file.pipe(fstream);
            fstream.on('close', function() {
                var file = fs.readFileSync(path.join(__dirname, '../public/files/'+ filename), "utf8");
				var base64text = new Buffer(file,'base64');
				try {
					var decrypted = decrypt(base64text).toString();
					//needed because of values like: 0.00 JSON.parse() converts 0.00 into 0 
					var re = /(\...)/g;
					//it converts every X.00 or X.X0 into X.001 or X.X01
					decrypted = decrypted.replace(re, '$11');
					//debugging 
					//fs.writeFileSync(path.join(__dirname, '../public/files/DEC_Vault1.sav'), decrypted);
					res.json(JSON.parse(decrypted));
				} catch (err) {
					console.log('WRONG FILE');
					res.json({'message':'ERROR: WRONG FILE: ' + filename});
				}

            });
        });
    });
	
	//sends the encryptes sav object to the client
	app.post('/sendSAV', function(req, res) {
		var decrypted = JSON.stringify(req.body.SAV);
		//removes the previously added 1 from the result
		var re =  /(\...)1/g;
		decrypted = decrypted.replace(re, '$1');
		//encodes the result
		var encrypted = encrypt(decrypted);
		//debugging
		//fs.writeFileSync(path.join(__dirname, '../public/files/NEW_Vault1DEC.sav'), decrypted);
		//fs.writeFileSync(path.join(__dirname, '../public/files/NEW_Vault1.sav'), encrypted);
		res.send(encrypted);
	});
};

exports.Index = Index;