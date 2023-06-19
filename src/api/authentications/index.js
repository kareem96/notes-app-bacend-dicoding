const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'authentications',
    version: '1.0.0',
    register: async (server, {
        auhtenticationsServices,
        userService,
        tokenManager,
        validator,
    }) => {
        const authenticationshandler = new AuthenticationsHandler(
            auhtenticationsServices,
            userService,
            tokenManager,
            validator,
        );
        server.route(routes(authenticationshandler));
    }
}