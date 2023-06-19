const routes = (handler) => [
    {
        method: 'POST',
        path: '/auhtentications',
        handler: handler.postAuthenticationHandler,
    },
    {
        method: 'PUT',
        path: '/auhtentications',
        handler: handler.putAuthenticationHandler,
    },
    {
        method: 'DELETE',
        path: '/auhtentications',
        handler: handler.deleteAuthenticationHandler,
    },
]
module.exports = routes;