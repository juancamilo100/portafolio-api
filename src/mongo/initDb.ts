import { DB_NAME, DB_URL } from "../../config";
import databaseManager from "./databaseManager";

const databaseInit = () => {
	const mongoDatabase = new databaseManager(
		DB_URL,
		DB_NAME
	);

	mongoDatabase.connect();
};

export { databaseInit };
