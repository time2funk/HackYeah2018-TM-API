// index.js
const debug = require('debug')('Main');
const db = require('./src/service/db');
const Server = require('./src/service/Server');
const router = require('./src/router');

try {
    // if (process.env.NODE_ENV !== 'production') 
    //     process.env.NODE_ENV = 'development';

    process.on('SIGINT', function () {
        process.exit(2);
    });

    process.on('exit', function () {
        console.log('\n Exit event...\n'); 
        Server.close();
    });

    // first thing - first
    // we need to connect to Mongo DB
    const mongo = new db.Mongo();
    mongo.init().then(() => {
        // if connected, then create Server
        const server = new Server();
        // add routing
        router(server.get());
    }).catch(e => {
        console.error(e.stack);
        console.error(e);
        throw new Error('There is no connection with database');
    });

} catch (error) {
    console.error(e.message);
    console.error(error.stack);
}