module.exports = {

	schema:true,
	attributes : {
		name:{
			type:"string"			
		},
		mobile:{
			type:"integer",
			required:true,
			maxLength:10,
			minLength:10
		},
		otp:{
			type:"integer",
			required:true
		},
		birthdate:{
			type:"date",
		},
		status:{
			type:"string",
			required:true
		},
		toJSON:function(){
			var obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};