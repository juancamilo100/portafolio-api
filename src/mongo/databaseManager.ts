import mongoose from "mongoose";

class DatabaseManager {
	constructor(private _connectionString: string, private _databaseName: string) {}

	public async connect() {
        mongoose.set("useFindAndModify", false);
        
        try {
            await mongoose.connect(this._connectionString, {
                useNewUrlParser: true,
                dbName: this._databaseName,
                connectTimeoutMS: 5000
            });

            console.log(`Connection successful to ${this._databaseName} at ${this._connectionString}`);
        } catch (error) {
            console.log(`Error when trying to connect to ${this._databaseName} at ${this._connectionString}`);
        }

		// mongoose.connection.on("connected", () => {
		// 	console.log(`Connection successful to ${this._databaseName} at ${this._connectionString}`);
		// });
    }
    
    public async disconnect() {
        await mongoose.disconnect();
    }
}

export default DatabaseManager;
