import databaseManager from "./databaseManager";

const databaseInit = () => {
    const mongoDatabase = new databaseManager(
        "mongodb://localhost:27017/",
        "portafolio"
    );

    mongoDatabase.connect();
};

export { databaseInit };
