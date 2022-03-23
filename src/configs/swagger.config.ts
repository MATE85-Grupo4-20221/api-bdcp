const SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Banco de Conteúdos Programáticos',
            description: 'Banco de Conteúdos Programáticos das disciplinas ofertadas pelos cursos da UFBA.',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
    },
    apis: ['./src/routers/*.ts']
};

export { SwaggerOptions };