import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const ShopCategories = db.define('shop_categories', {
    category_name: {
        type: DataTypes.STRING
    },
    shop_id: {
        type: DataTypes.NUMBER
    }
}, {
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default ShopCategories;