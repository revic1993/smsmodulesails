var gStatus = sails.config.smsconfig.status;

module.exports = {
	new : function(req,res,next){
		var mNumber = parseInt(req.param("number"));
		
		if(isNaN(mNumber) && mNumber.length!=10)		 
			return Common.returnError(res,"Enter valid mobile number");

		

		User.findOne({mobile:mNumber},function(err,user){

			if(err) return Common.returnError(res,"Server error!");

			if(user){	
				User.update({id:user.id},{otp:Math.floor(Math.random()*(10000-9000))+9000}).exec(function(err,user){
					console.log(user);
					if(err) return Common.returnError(res,'Server error!');
					return Common.returnOk(res,"User otp updated",{otp:user[0].otp,id:user[0].id});
				});
			}else{
				var params = {
					mobile:mNumber,
					otp:Math.floor(Math.random()*(10000-9000))+9000,
					status:gStatus.pending,
				};

				User.create(params,function(err,user){
					if(err) return Common.returnError(res,"There was error creating user");
					//send otp to user
					return Common.returnOk(res,"User successfully created!",{otp:user.otp,id:user.id});
				});
			}
		})

		
	},

	verifyotp : function(req,res,next){
		var otp = parseInt(req.param('otp')),
			user_id = req.param('id');

		if(typeof(otp)!=="number"||typeof(user_id)!=="string")
			return Common.returnError(res,"Parameters invalid!");

		User.findOne(user_id,function(err,user){
			if(err) 
				return Common.returnError(res,"Server error!");

			if(!user) 
				return Common.returnError(res,"User not found");

			if(otp!==user.otp) 
				return Common.returnError(res,"Invalid otp");

			User.update({id:user.id},{status:gStatus.verified}).exec(function(err,updated){
				if(err) 
					return Common.returnError(res,"Server error!");
				return Common.returnOk(res,"User verified",null);
			});
		});

	},
	completeUser : function(req,res,next){
		if(!req.param('name')|| !req.param('id') || !req.param('birthdate'))
			return Common.returnError(res,"Enter credentials")
		User.update({id:req.param('id')},{name:req.param('name'),birthdate:new Date(req.param('birthdate'))}).exec(function(err,user){
			if(err) return Common.returnError(res,'Server error!');
			if(!user) return Common.returnError(res,'User not found');
			return Common.returnOk(res,"User profile completed");
		});
	}
}