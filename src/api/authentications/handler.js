const ClientError = require('../../exceptions/ClientError');

class AuthenticationsHandler {
    constructor(authenticationsService, userService, tokenManager, validator){
        this._authenticationsServices = authenticationsService,
        this._userService = userService,
        this._tokenManager = tokenManager,
        this._validator = validator;

        this._postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
        this._putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
        this._deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }

    async postAuthenticationHandler(request, h){
        try {
            this._validator.validtePostAuthenticationPayload(request.payload);
            const {username, password} = request.payload;
            const id = await this._userService.verifyUserCredential(username, password);
            
            const accessToken = this._tokenManager.generateAccessToken({id});
            const refreshToken = this._tokenManager.generateRefreshToken({id});
            await this._authenticationsServices.addRefreshToken(refreshToken);
            const response = h.response({
                status: 'success',
                message: 'Authentication berhasil ditambahkan',
                data:{
                    accessToken,
                    refreshToken,
                }
            });
             response.code(201);
             return response;
        } catch (error) {
            if(error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'Maaf terjadi kesalahan pada server kami',
            });
            response.code(500);
            console.log(error);
            return response;   
        }
    }

    async putAuthenticationHandler(request, h){
        try {
            this._validator.validtePutAuthenticationPayload(request.payload);
            const {refreshToken} = request.payload;
            await this._authenticationsServices.verifyRefreshToken(refreshToken)
            const {id} = this._tokenManager.verifyRefreshToken(refreshToken)
            const accessToken = this._tokenManager.generateAccessToken({id})
            return{
                status: 'success',
                message: 'Access token berhasil diperbaharui',
                data:{
                    accessToken
                }
            }
        } catch (error) {
            if(error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'Maaf terjadi kesalahan pada server kami',
            });
            response.code(500);
            console.log(error);
            return response;   
        }
    }

    async deleteAuthenticationHandler(request, h){
        try {
            this._validator.validteDeleteAuthenticationPayload(request.payload);
            const {refreshToken} = require.payload;
            await this._authenticationsServices.verifyRefreshToken(refreshToken);
            await this._authenticationsServices.deleteRefreshToken(refreshToken);
            return{
                status: 'success',
                message: 'Refresh token berhasil dihapus',
            }
        } catch (error) {
            if(error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'Maaf terjadi kesalahan pada server kami',
            });
            response.code(500);
            console.log(error);
            return response;   
        }
    }
}
module.exports = AuthenticationsHandler;