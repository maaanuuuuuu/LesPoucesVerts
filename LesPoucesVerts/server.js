var restify = require('restify');  //express light en gros
var mongojs = require('mongojs');
var fs = require("fs");
var parameters = require("./Config/parameters");
var collections = require("./collections");


//lecture des fichiers repository et donc création du db en fonction avec le bon collection
    
//initialisation de collection
var collectionNames = [];
for (var i = 0; i < collections.length; i++) {
    collectionNames.push(collections[i].name);
}


//création de l'objet mongojs
var db = mongojs(
    parameters.db.connectionString(),
    collectionNames
);

//création du server avec restify
var server = restify.createServer({
    // certificate:...
    // key:...
    name: "poucesServer"
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.listen(3000, function () {     //start the server
    console.log("Server started @ 3000");
});

//initialize routes
Routes = require("./Routes/Route");
var routes = new Routes(db);
routes = routes.routes;

// générateur de routes
for (var i = 0; i<routes.length; i++) {
    route = routes[i];
    // déclarer les services ci dessous grace à routes
    switch(route.method) {
        case "get":
            server.get(route.route, route.callback);
        break;
        case "post":
            server.post(route.route, route.callback);
        break; 
        case "put":
            server.put(route.route, route.callback);
        break;
    } 
}

