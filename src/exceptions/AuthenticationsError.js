const ClientError = require('./ClientError');

class AuthenticationERror extends ClientError{
    constructor(message){
        super.message(message, 401);
        this.name = 'AuthenticationError';
    }
}

module.exports = AuthenticationERror;