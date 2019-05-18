class databaseManager {
    constructor(orm, connectionString, databaseName) {
        this._orm = orm;
        this._connectionString = connectionString
        this._databaseName = databaseName;
    }
    
    connect() {
        this._orm.connect(this._connectionString, {
            useNewUrlParser: true,
            dbName: this._databaseName,
            connectTimeoutMS: 5000
        });

        this._orm.connection.on('connected', () => {  
            console.log(`Connection successful to ${this._databaseName} at ${this._connectionString}`);
        }); 
    }

    watchCollection(collection) {
        const collection = db.collection('inventory');
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            // process next document
        });
    }

}

module.exports = databaseManager;