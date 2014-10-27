var restify = require('restify');
var mongojs = require('mongojs');

var db = mongojs('mongodb://desiremmanuel:8818196892W8i9G3@ds063889.mongolab.com:63889/les_pouces_verts_dev', ['plants']);

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
    console.log("Server started @ 3000");
});

server.get("/plants", function (req, res, next) {
    db.plants.find(function (err, plants) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(plants));
    });
    return next();
});

server.get('/plants/:id', function (req, res, next) {
    db.plants.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.post('/plants', function (req, res, next) {
    var plants = req.params;
    db.plants.save(plants,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});

server.put('/plants/:id', function (req, res, next) {
    // get the existing plant
    db.plants.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/plant with the server/plant
        var updPlants = {}; // updated plants 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updPlants[n] = data[n];
        }
        for (var n in req.params) {
            updPlants[n] = req.params[n];
        }
        db.plants.update({
            id: req.params.id
        }, updPlants, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

module.exports = server;