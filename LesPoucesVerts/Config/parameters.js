module.exports = {
    repoDir: "./Repositories/",
    routeDir: "./Routes/",
    db:{
        login: "desiremmanuel",
        pwd: "no",
        domain: "ds063889.mongolab.com",
        port: "63889",
        name: "les_pouces_verts_dev",
        connectionString: function() {
            return "mongodb://"+this.login+":"+this.pwd+"@"+this.domain+":"+this.port+"/"+this.name;
        }
    }
}

//"mongodb://"+login+":"+pwd+"@"+domain+":"+port+"/"+name