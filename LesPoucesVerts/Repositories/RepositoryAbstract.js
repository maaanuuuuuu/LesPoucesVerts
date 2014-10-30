module.exports = function Repository(db, collectionName) 
{
    this.db = db;
    this.collectionName = collectionName;

    this.findall = function(req, res, next) 
    {
        this.db.collection(this.collectionName).find(function (err, product) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(product));
        });
        return next();
    }

    this.findOne = function(req, res, next)
    {
        this.db.collection(this.collectionName).findOne({id: req.params.id}, 
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
        return next();
    }

    this.create = function(req, res, next)
    {
        var productsToCreate = req.params;
        this.db.collection(this.collectionName).save(productsToCreate,
            function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        return next();
    }

    this.edit = function(req, res, next)
    {
        // get the existing product
        var db = this.db;
        var collectionName = this.collectionName;
        this.findOne(req, res, function(err, data) {
            // merge req.params/product with the server/product
            var updProducts = {}; // updated products
            // logic similar to jQuery.extend(); to merge 2 objects.
            for (var n in data) {
                updProducts[n] = data[n];
            }
            for (var n in req.params) {
                updProducts[n] = req.params[n];
            }
            console.log("coleciton name="+collectionName);
            db.collection(collectionName).update(
                {
                    id: req.params.id
                },
                updProducts,
                {
                    multi: false
                }, 
                function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                }
            );
        });
        
        return next();
    }
}
