module.exports = {
	returnError: function(res,errorMsg){
		return res.badRequest({"error":true,"message":errorMsg});
	},
	returnOk: function(res,message,data){
		if(!data) 
			return res.json({"error":false,"message":message});
		
		return res.json({"error":false,"message":message,"data":data});
	}
}