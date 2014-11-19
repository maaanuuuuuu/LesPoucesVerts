module.exports = function Route(db, collections)
{ 
    Repository = require("../Repositories/RepositoryAbstract");

    this.routes = [];

    for (var i = 0; i < collections.length; i++) {
        collection = collections[i].name;
        var repository = new Repository(db, collection);
        routes = [
            {
                route: "/"+collection,
                method: "get",
                callback: function(req, res, next) {
                    repository.findall(req, res, next);
                }
            },
            {
                route: "/"+collection+"/:id",
                method: "get",
                callback: function(req, res, next) {
                    repository.findOne(req, res, next);
                }
            },
            {
                route: "/"+collection,
                method: "post",
                callback: function(req, res, next) {
                    repository.create(req, res, next);
                }
            },
            {
                route: "/"+collection+"/:id",
                method: "put",
                callback: function(req, res, next) {
                    repository.edit(req, res, next);
                }
            }
        ];
        this.routes = this.routes.concat(routes);
    };

}