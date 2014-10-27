var mongo = require('mongodb');
 
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
 
// var server = new Server('localhost', 27017, {auto_reconnect: true});
// mongodb://desiremmanuel:8818196892W8i9G3@ds029798.mongolab.com:29798/symfony
var server = new Server('mongodb://desiremmanuel:8818196892W8i9G3@ds029798.mongolab.com', 29798, {});
db = new Db('les_pouces_verts_dev', server, {safe : true});
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'les_pouces_verts_dev' database");
        db.collection('plants', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'plants' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else {
        console.log(err);
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving plant: ' + id);
    db.collection('plants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('plants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addPlant = function(req, res) {
    var plant = req.body;
    console.log('Adding plant: ' + JSON.stringify(plant));
    db.collection('plants', function(err, collection) {
        collection.insert(plant, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updatePlant = function(req, res) {
    var id = req.params.id;
    var plant = req.body;
    console.log('Updating plant: ' + id);
    console.log(JSON.stringify(plant));
    db.collection('plants', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, plant, {safe:true}, function(err, result) {
        if (err) {
                console.log('Error updating plant: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(plant);
            }
        });
    });
}
 
exports.deletePlant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting plant: ' + id);
    db.collection('plants', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var plants = [
    {
        name: "My First Plant",
        year: "2009"
    },
    {
        name: "My Second Plant",
        year: "2006",
    }];
     
    db.collection('plants', function(err, collection) {
        collection.insert(plants, {safe:true}, function(err, result) {});
    });
 
};