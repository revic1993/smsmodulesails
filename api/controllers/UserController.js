var gStatus = sails.config.smsconfig.status;

module.exports = {
	new : function(req,res,next){
		var mNumber = parseInt(req.param("number"));
		
		if(typeof(mNumber)!=="number")		 
			return res.json({"error":true,"message":"Enter valid mobile number"}) ;

		var params = {
			mobile:mNumber,
			otp:Math.floor(Math.random()*(10000-9000))+9000,
			status:gStatus.pending,
		};

		User.create(params,function(err,user){
			if(err) return res.json({"error":true,"message":"There was error creating user"});
			return res.json({"error":false,"message":"User successfully created!","user":user});
		});
	}
}