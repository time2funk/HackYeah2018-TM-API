// src/controller/index.js
const debug = require('debug')('controller');
const DBService = require('../service/db');


const getVertices = (req, res) => {
    debug('getVertices');
    DBService.class.vertex.get().then(vertices => {
        res.send({result: vertices});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};
const getEdges = (req, res) => {
    debug('getEdges');
    DBService.class.edge.get().then(edges => {
        res.send({result: edges});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};
const getVehicles = (req, res) => {
    debug('getVertices');
    DBService.class.vehicle.get().then(vehicles => {
        res.send({result: vehicles});
    });
};
const getStations = (req, res) => {
    debug('getVertices');
    DBService.class.station.get().then(stations => {
        res.send({result: stations});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};
module.exports.get = {
    vertices: getVertices,
    edges: getEdges,
    vehicles: getVehicles,
    stations: getStations
};

const postVertex = (req, res) => {
    debug('postVertex');

    const id = req.body.id;
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);
    const lat = parseFloat(req.body.lat);
    const lon = parseFloat(req.body.lon);

    // if (!(id && x && y && lat & lon)) {
    //     res.send("Wrong params");
    //     res.status(400).end();
    // }
    DBService.class.vertex.insert(id, x, y, lat, lon).then(result => {
        res.send({result: result});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};
const postVertices = (req, res) => {
    debug('postVertices');
    try {
        const list = req.body.list;
        let results = [];

        if (!list) {
            res.send("Wrong params");
            res.status(400).end();
        } else {
            for (let i=0, p = Promise.resolve();  i<list.length; i++) {
            p = p.then(_ => new Promise(resolve => {
                debug(`****${i}`);
                const item = list[i];
                const id = item.id;
                const x = parseFloat(item.x);
                const y = parseFloat(item.y);
                const lat = parseFloat(item.lat);
                const lon = parseFloat(item.lon);

                if (!(x && y && lat & lon)) {
                    res.send("Wrong params");
                    res.status(400).end();
                } else 
                    DBService.class.vertex.insert(id, x, y, lat, lon).then(result => {
                        debug('postVertices', result);
                        results.push(result);
                        resolve();
                    }).catch(e => {
                        console.error(e.stack)
                        res.send(e);
                        res.status(400).end();
                    });

            }));

            } // <- for loop end
            res.send({result: results});
        }
    } catch (error) {
        res.send(e);
        res.status(400).end();
    }
};
const postEdge = (req, res) => {
    debug('postEdge');

    const id = req.body.id;
    const width = req.body.width ? req.body.width : 800;
    const heigth = req.body.heigth ? req.body.height : -1;
    const available = req.body.available ? req.body.available : true;
    const direction = req.body.direction ? req.body.direction : 0;
    const firstVertex = req.body.first || req.body.vertex.first;
    const secondVertex = req.body.last || req.body.vertex.second;

    DBService.class.edge.insert(id, width, heigth, available, firstVertex, secondVertex, direction).then(result => {
        res.send({result: result});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};
const postEdges = (req, res) => {
    debug('postEdges');
    try {
        const list = req.body.list;
        let results = [];

        if (!list) {
            res.send("Wrong params");
            res.status(400).end();
        } else {

            for (let i=0, p = Promise.resolve();  i<list.length; i++) {
            p = p.then(_ => new Promise(resolve => {
                const item = list[i];
                const id = item.id;
                const width = item.width ? item.width : 800;
                const heigth = item.heigth ? item.heigth : -1;
                const available = item.available ? item.available : true;
                const direction = item.direction ? item.direction : 0;
                const firstVertex = item.first || item.vertex.first;
                const secondVertex = item.last || item.vertex.second;

                DBService.class.edge.insert(id, width, heigth, available, firstVertex, secondVertex, direction).then(result => {
                    results.push(result);
                    resolve();
                    console.log('booyaa ha ta');
                });
                // .catch(e => {
                //     res.send(e);
                //     res.status(400).end();
                // });
            }));

            } // <- for loop end
            res.send({result: results});
        }
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};
const postVehicle = (req, res) => {
    debug('postVehicle');

    const id = req.body.id;
    const width = req.body.width;
    const heigth = req.body.heigth;
    const length = req.body.length;

    // if (!(id && width && heigth & length)) {
    //     res.send("Wrong params");
    //     res.status(400).end();
    // }
    DBService.class.vehicle.insert(id, width, heigth, length).then(result => {
        res.send({result: result});
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
};

const postVehicles = (req, res) => {
    debug('postVehicles');
    try {
        const list = req.body.list;
        let results = [];

        if (!list) {
            res.send("Wrong params");
            res.status(400).end();
        } else {
            for (let i=0, p = Promise.resolve();  i<list.length; i++) {
            p = p.then(_ => new Promise(resolve => {
                const item = list[i];
                const id = req.item;
                const width = req.item;
                const heigth = req.item;
                const length = req.item;

                // if (!(id && width && heigth & length)) {
                //     res.send("Wrong params");
                //     res.status(400).end();
                // }
                DBService.class.vehicle.insert(id, width, heigth, length).then(result => {
                    results.push(result)
                }).catch(e => {
                    res.send(e);
                    res.status(400).end();
                });
            }));

            } // <- for loop end
            res.send({result: results});
        }
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};
const postStation = (req, res) => {
    debug('postStation');

    const id = req.body.id;
    const edge = req.body.edge;
    const vertex = req.body.vertex;

    // debug('*****_', {id ,edge ,vertex});
    // debug('*****_', !(id && edge & vertex));
    // if (!(id && edge & vertex)) {
    //     res.send("Wrong params");
    //     res.status(400).end();
    // } else
        DBService.class.station.insert(id, edge, vertex).then(station => {
            res.send({result: station});
        }).catch(e => {
            res.send(e);
            res.status(400).end();
        });
};
const postStations = (req, res) => {
    debug('postStations');
    try {
        const list = req.body.list;
        let results = [];

        if (!list) {
            res.send("Wrong params");
            res.status(400).end();
        } else {
            for (let i=0, p = Promise.resolve();  i<list.length; i++) {
            p = p.then(_ => new Promise(resolve => {
                const item = list[i];
                const id = item.id;
                const edge = item.edge;
                const vertex = item.vertex;

                // if (!(id && width && heigth & length)) {
                //     res.send("Wrong params");
                //     res.status(400).end();
                // }
                DBService.class.station.insert(id, edge, vertex).then(station => {
                    results.push(station);
                }).catch(e => {
                    res.send(e);
                    res.status(400).end();
                });
            }));

            } // <- for loop end
            res.send({result: results});
        }
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};

const filteredEdges = (req, res) => {
    debug('filteredEdges');

    const height = req.body.height;
    const width = req.body.width;

    DBService.class.edge.get().then(edges => {
        debug('booo-yaaa');
        const result = edges.filter(item => {
            let bool = true;
            if (!item.available) bool = false;
            if (width && (width > item.available)) bool = false;
            if ((item.height !== -1) 
                && height 
                && (height > item.height)) bool = false;
            return bool;
        });
        res.send({
            result: edges,
            result2: result
        });
    }).catch(e => {
        res.send(e);
        res.status(400).end();
    });
} 

module.exports.post = {
    vertex: postVertex,
    vertices: postVertices,
    edge: postEdge,
    edges: postEdges,
    vehicle: postVehicle,
    vehicles: postVehicles,
    station: postStation,
    stations: postStations,

    filteredEdges: filteredEdges
};


const deleteEdges = (req, res) => {
    debug('deleteEdges');
    try {
        DBService.class.edge.purge().then(() => {
            res.send({status: 'hack yeah'});
        });
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};
const deleteVertices = (req, res) => {
    debug('deleteVertices');
    try {
        DBService.class.vertex.purge().then(() => {
            res.send({status: 'hack yeah'});
        });
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};

const deleteVehicles = (req, res) => {
    debug('deleteVehicles');
    try {
        DBService.class.vehicle.purge().then(() => {
            res.send({status: 'hack yeah'});
        });
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};
const deleteStations = (req, res) => {
    debug('deleteStations');
    try {
        DBService.class.station.purge().then(() => {
            res.send({status: 'hack yeah'});
        });
    } catch(error) {
        res.send(error);
        res.status(400).end();
    }
};


module.exports.delete = {
    vertices: deleteVertices,
    edges: deleteEdges,
    vehicles: deleteVehicles,
    stations: deleteStations
};

const fs = require('fs');
const path = require('path');

const testCtrl = (req, res) => {
    debug('testCtrl');
    fs.readFile(path.resolve(__dirname, "example/query.json"), (e, data) => {
        if (e) {
            res.send(e);
            res.status(400).end();
        };
        res.json(JSON.parse(data));
    });
};
module.exports.test = testCtrl;