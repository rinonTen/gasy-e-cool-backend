import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./e_gasy_cool.sqlite" // This file will be created if it doesn't exist
});

(async () => {
    try {
        await db.sync(); // This creates the database file and tables if they don't exist
        console.log("Database synced and ready to use!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();

export default db;
