const url = process.env.NODE_ENV === 'production'
    ? 'https://api-bdcp.herokuapp.com/'
    : `http://localhost:${process.env.PORT}`;

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
                url,
            },
        ],
    },
    apis: ['./src/routers/*.ts']
};

export { SwaggerOptions };
