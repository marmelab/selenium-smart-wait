import StaticServer from 'static-server';

export default port =>
    new Promise((resolve, reject) => {
        try {
            const server = new StaticServer({
                rootPath: '../node_modules/todomvc/examples/vanillajs',
                port,
            });

            server.start(() => {
                console.log('Server listening to', server.port);
                resolve(server);
            });
        } catch (error) {
            reject(error);
        }
    });
