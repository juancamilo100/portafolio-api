import databaseManager from "./databaseManager";
import { DB_URL, DB_NAME } from '../config'

const databaseInit = () => {
	const mongoDatabase = new databaseManager(
		DB_URL,
		DB_NAME
	);

	mongoDatabase.connect();
};

export { databaseInit };
