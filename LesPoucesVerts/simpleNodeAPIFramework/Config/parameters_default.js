module.exports = {
    repoDir: "./Repositories/",
    routeDir: "./Routes/",
    server:{
        name: "ServerName",
        port: 3000
    },
    db:{
        login: "",
        pwd: "",
        domain: "",
        port: "",
        name: "",
        connectionString: function() {
            return "mongodb://"+this.login+":"+this.pwd+"@"+this.domain+":"+this.port+"/"+this.name;
        }
    }
}

//"mongodb://"+login+":"+pwd+"@"+domain+":"+port+"/"+name