const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    console.log('Connected');

    const dbName = 'myproject';
    const db = client.db(dbName);
    

    const names = 'user' + Math.floor(Math.random()*10000);
    const email = names + '@mit.edu';

    const collection = db.collection('customers');
    const doc = {names, email};
    collection.insertOne(doc, {w:1}, function (err,result) {
        console.log('Document insert');
    });

    const customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

            client.close()
        });
});