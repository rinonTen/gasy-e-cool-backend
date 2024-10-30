import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    owner_first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    owner_phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image_alt_text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    is_favourited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_updated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});

(async () => {
    try {
        await db.sync();
        console.log("Products table has been synced successfully!");
    } catch (error) {
        console.error("Error syncing Products table:", error);
    }
})();

export default Products;
