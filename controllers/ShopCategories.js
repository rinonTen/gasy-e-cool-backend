import ShopCategories from "../models/ShopCategories.js";

const shopCategoriesAttributes = [
    'id',
    'category_name',
    'shop_id',
    'createdAt',
    'updatedAt'
];

export const shopCategories = async(body, res) => {
    const { category_name, shop_id } = body;
 
    try { 
        await ShopCategories.create({
            category_name,
            shop_id
        });
        const categories = await ShopCategories.findAll({
            attributes: shopCategoriesAttributes
        });
        res.json({ msg: "Category added successfully", data: categories });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `There was an issue when adding a shop category. ${error.message}`,
            data: null
        });
    };
};

export const getShopCategories = async (_req, res) => {
    try {
        const categories = await ShopCategories.findAll({
            attributes: shopCategoriesAttributes
        });
        res.json({ message: 'Categories fetched successfully', data: categories });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `There was an issue when fetching shop categories. ${error.message}`,
            data: null
        });
    };
};
