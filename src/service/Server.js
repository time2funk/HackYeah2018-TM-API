// src/service/Server.js
const debug = require('debug')('Server');
const config = require('config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors')

let server = null;
// Server class
module.exports = class Server {
    constructor () {
        server = createServer();
    }

    get () { // singleton
        return server;
    }

    static close () {
        closeServer();
        debug(`closed (x_X)`);
    }
}

// create express server
const createServer = () => {
    try {
        debug(`create new server`);
        if (server) return server;

        const app = express();
        app.set('port', config.server.port);
        
        app.use(cors());
        // Server Error Handler 
        app.use(function(err, req, res, next) {
            console.error(err.stack);

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.server.port}`);

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.status(500).send('Something went wrong!');
        });

        app.use(bodyParser.json({
            limit: '5mb'
        }));
        // app.use( express.bodyParser.urlencoded({ extended: true,limit: '50mb', parameterLimit:50000 }) );
        // app.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // });

        app.listen(app.get('port'), () => {
            debug('running on port', server.get('port'));
        });

        // http.createServer(app)
        //     .listen(app.get('port'), () => {
        //         debug('Server - running on port', app.get('port'));
        //     });

        return app;
    } catch (e) {
        throw new Error(`CreateServer: ${e}`);
    }
}

const closeServer = function () {
    try {
        if (server) { 
            if (server.close)
                server.close();
            server = null;
        }
    } catch (e) {
        throw new Error(`closeServer: ${e}`);
    }
}


