import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const OnlineShops = db.define('online_shops', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    contact: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    facebook_link: {
        type: DataTypes.STRING
    },
    twitter_link: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_favourited: {
        type: DataTypes.BOOLEAN
    },
    is_updated: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default OnlineShops;