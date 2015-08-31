var crypto = require('crypto'); //https://nodejs.org/api/crypto.html
var fs = require('fs');

// How to find the initVector and key
// Given IV in \assets\bin\Data\Managed\Assembly-CSharp.dll -> StringCipher.cs
// keysize = 256
// initVector = tu89geji340t89u2 in hex = 7475383967656a693334307438397532
// base64 PassPhrase = UGxheWVy -> in UTF8: Player
// decodeKey = Rfc2898DeriveBytes(PassPhrase,initVectorinHEX).getBytes(keysize/8) -> A7CA9F3366D892C2F0BEF417341CA971B69AE9F7BACCCFFCF43C62D1D7D021F9

var iv = new Buffer('7475383967656a693334307438397532', 'hex');
var encrypt = function(data) {
	var decodeKey = new Buffer('A7CA9F3366D892C2F0BEF417341CA971B69AE9F7BACCCFFCF43C62D1D7D021F9', 'hex');
	var cipher = crypto.createCipheriv("aes-256-cbc", decodeKey, iv);
	var chunks = [];
	//cipher.update(data[, input_encoding][, output_encoding])
	chunks.push(cipher.update(data, "utf8", "base64"));
	//cipher.final([output_encoding])
	chunks.push(cipher.final("base64"));
	return chunks.join('');
};

var decrypt = function(data) {
	var encodeKey = new Buffer('A7CA9F3366D892C2F0BEF417341CA971B69AE9F7BACCCFFCF43C62D1D7D021F9', 'hex');
	var cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);
	var chunks = [];
	//cipher.update(data[, input_encoding][, output_encoding])
	chunks.push(cipher.update(data, "base64", "utf8"));
	//cipher.final([output_encoding])
	chunks.push(cipher.final("utf8"));
	return chunks.join('');;
};

//File Read
console.log('Reading: Vault1.sav');
var file = fs.readFileSync('Vault1.sav', "utf8");
//The content is in base64
//var base64text = new Buffer(file,'base64')
var base64text = new Buffer(file,'base64')

//Decrypting
console.log('Decrypting Vault1.sav');
var decrypted = decrypt(base64text).toString()
fs.writeFileSync('fs.tmp', decrypted);
//Encrypting
console.log('Reencrypting Vault1.sav');
var encrypt = encrypt(decrypted)


//console.log('Encrypted text: ',hw.toString('utf8'),hw.toString('utf8').length)
console.log('Decrypted text: ',JSON.parse(decrypted))

console.log('Write encrypted result Vault1.sav');
fs.writeFileSync('encrypted_fs.tmp', encrypt);



