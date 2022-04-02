// cluster > database > collections > document
let contact_us_connection = (getObj) => {
    const {MongoClient} = require('mongodb')
    const connection_password = 'IlI0Wx6rNNpXkA4J'
    const uri = `mongodb+srv://holvamp:${connection_password}@cluster0.xi1m1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    const dbName = 'holvamp-database';
    const collectionName = 'holvamp-contact-forms';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // koneksi ke erver mongodb
    client.connect((error, client) => {
        if(error){
            console.log('Connection Fail');
        }
        const db = client.db(dbName);
        db.collection(collectionName).insertOne(getObj, (error, result) => {
            if(error){
                return console.log('Failed to add document.');
            }
            console.log(result);
        })
    });
}

module.exports = {contact_us_connection}