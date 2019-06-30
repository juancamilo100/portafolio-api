import mongoose from "mongoose";

class DatabaseManager {
	constructor(private _connectionString: string, private _databaseName: string) {}

	public connect() {
		mongoose.connect(this._connectionString, {
			useNewUrlParser: true,
			dbName: this._databaseName,
			connectTimeoutMS: 5000
        });

        mongoose.set("useFindAndModify", false);

		mongoose.connection.on("connected", () => {
			console.log(`Connection successful to ${this._databaseName} at ${this._connectionString}`);
		});
	}
}

export default DatabaseManager;
