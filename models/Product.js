import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Products = db.define('products', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    owner_first_name: {
        type: DataTypes.STRING
    },
    owner_last_name: {
        type: DataTypes.STRING
    },
    owner_email: {
        type: DataTypes.STRING
    },
    owner_phone_number: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    image_alt_text: {
        type: DataTypes.STRING
    },
    video_url: {
        type: DataTypes.STRING | null
    },
    price: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Products;