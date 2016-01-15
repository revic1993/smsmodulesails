
module.exports.routes = {
  'post /user/new' : 'UserController.new',
  'post /user/verify' : 'UserController.verifyotp',
  'post /user/complete':'UserController.completeUser'
};
