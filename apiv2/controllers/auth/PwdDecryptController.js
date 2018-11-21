const bcrypt = require('bcrypt');


	async function decrypt(pwdIn, realPwd){
	
		const isReal = await bcrypt.compare(pwdIn, realPwd, function(err, res) {
      		if(err){
      			console.log('Error intentando desencriptar la contraseña');
      			res.end();
      		}else{
      			return res;
      		}
   
		});
		


}

module.exports = decrypt;