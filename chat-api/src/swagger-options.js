require('dotenv').config()
const { env: { API_URL, PORT } } = process;

module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API for JSONPlaceholder',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'JSONPlaceholder',
                url: 'https://jsonplaceholder.typicode.com',
            },
        },
        servers: [
            {
                url: [`${API_URL}:${PORT}`],
                description: 'Development server',
            },
        ],
    },
    apis: ['src/routes/*.js'],
};

