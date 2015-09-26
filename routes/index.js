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
	
	//A feltoltest kezeli es elinditja a /sendVault -ot (ossze is lehetne vonni de igy sztem olvashatobb)
	app.post('/upload', function(req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //temp dir of the files
            fstream = fs.createWriteStream(path.join(__dirname, '../public/files/' + filename));
            file.pipe(fstream);
            fstream.on('close', function() {
				//redirect kliens oldalon nem megy mert angular nem engedi az url-t megvaltoztatni, de szerver oldalon megy
                res.redirect('/sendDecryptedVault');
            });
        });
    });
	
	//Ennek csak decryptalni kell majd elkuldeni a kliensnek a decryptelt sav-ot.
	//Kell egy masik ami fogadja a modositott jsont es decrypteli majd visszakuldi a kliensnek.
	app.get('/sendDecryptedVault', function(req, res) {
		console.log('Reading original: Vault1.sav');
		var file = fs.readFileSync(path.join(__dirname, '../public/files/Vault1.sav'), "utf8");
		// The content is in base64
		var base64text = new Buffer(file,'base64');
		// Decrypting
		console.log('Decrypting Vault1.sav');
		var decrypted = decrypt(base64text).toString()
		fs.writeFileSync(path.join(__dirname, '../public/files/DEC_Vault1.sav'), decrypted);

        //res.send(JSON.parse(decrypted)); res.send and res.json ugyanaz (res.json is res.send-et hiv)
		res.json(JSON.parse(decrypted));
    });
	
	app.get('/sendEncryptedVault', function(req, res) {
		// Encrypting back
		console.log('Reencrypting DEC_Vault1.sav');
		// decrypted -et megkapja kliens oldalrol
		//var encrypted = encrypt(decrypted)
		//console.log('Write encrypted result Vault1.sav');
		//fs.writeFileSync(path.join(__dirname, '../public/files/NEW_Vault1.sav'), encrypted);
		
		//visszakuldi a kliensnek az encodeolt fajlt
        res.send('ENCRYPTED FILE')
		//res.json(JSON.parse(decrypted));
    });
	
	app.post('/sendSAV', function(req, res) {
		data = req.body.SAV;
		res.json(data);
	});
};

exports.Index = Index;