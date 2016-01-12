module.exports = {

	schema:true,
	attributes : {
		name:{
			type:"string"			
		},
		mobile:{
			type:"integer",
			required:true
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
		}
	}
};