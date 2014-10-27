var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});

// a static plants to CREATE READ UPDATE DELETE

var testPlant = {
    id: "1",
    name: "Ma plante"
};

client.post('/plants', testPlant, function (err, req, res, plants) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Plant saved >>>>>>>');
        console.log(plants);
    }
});

client.get('/plants', function (err, req, res, products) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log("Total products " + products.length);
        console.log('All products >>>>>>>');
        console.log(products);
    }
});

testPlant.name = "New Name",
client.put('/plants/' + testPlant.id, testPlant, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(status);
    }

});