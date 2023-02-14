import { Sequelize } from "sequelize";
 
const db = new Sequelize('e_gasy_cool', 'root', process.env.DB_PASSWORD || 'Rino@Mahanoro123', {
    host: "127.0.0.1",
    dialect: "mysql"
});
 
export default db;