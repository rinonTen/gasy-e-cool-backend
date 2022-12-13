import { Sequelize } from "sequelize";
 
const db = new Sequelize('e_gasy_cool', 'root', process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;