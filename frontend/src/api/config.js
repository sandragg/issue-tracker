export const apiConfig = {
    protocol: 'http:',
    host: 'localhost:8000',
    pathNames: {
        authorization: '/login',
        user: '/user',
        issue: '/issue',
        field: '/field'
    }
};

export function getApiPath(config, modelType) {
    const { protocol, host, pathNames } = config;

    return `${protocol}//${host}${pathNames[modelType]}`
}
