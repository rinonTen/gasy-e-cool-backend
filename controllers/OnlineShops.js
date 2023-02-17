import { Op } from "sequelize";
import OnlineShops from "../models/OlineShop.js";
import { shopCategories } from "./ShopCategories.js";

const onlineShopsAttributes = [
    'id',
    'name',
    'description',
    'contact',
    'location',
    'image_url',
    'category',
    'facebook_link',
    'twitter_link',
    'createdAt',
    'updatedAt',
    'is_favourited'
]

export const AddOnlineShop = async (req, res) => {
    const {
        id,
        name,
        description,
        contact,
        location,
        image_url,
        category,
        facebook_link,
        twitter_link
    } = req.body;

    try {
        await OnlineShops.create({
            id,
            name,
            description,
            contact,
            location,
            image_url,
            category,
            facebook_link,
            twitter_link
        });

        const onlineShops = await OnlineShops.findAll({
            attributes: onlineShopsAttributes
        });
        await shopCategories({ category_name: category, shop_id: id });
        res.json({ msg: "Shop added successfully", data: onlineShops });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `There was an issue when uploading your shop. ${error.message}`,
            data: null
        });
    };
};

export const getOnlineShops = async (_req, res) => {
    try {
        const onlineShops = await OnlineShops.findAll({
            attributes: onlineShopsAttributes
        });
        res.json(onlineShops);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `An error has occurred when fetching data. ${error.message}`
        })
    };
};

// This should work for any update made on each shop
export const updateShop = async (req, res) => {
    try {
        const shopToUpdate = await OnlineShops.findOne({ where: { id: req.params.id } });
        const shop = shopToUpdate.dataValues;
        // Update any keys/items that match the client's requests
        for (const shopKey in shop) {
            for (const reqKey in req.body) {
                if (shopKey === reqKey) {
                    shop[`${shopKey}`] = req.body[`${reqKey}`]
                }
            };
        };

        await OnlineShops.update(shop, {
            where: { id: req.params.id }
        });
        const shops = await OnlineShops.findAll({
            attributes: onlineShopsAttributes
        });
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    };
};

export const deleteShop = async (req, res) => {
    try {
        const result = await OnlineShops.destroy({
            where: { id: req.params.id },
            force: true
        });
        if (result === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'A shop with that id is not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    };
};

export const filterShops = async (req, res) => {
    const { is_favourited, is_updated, keywords, first_operator, second_operator, third_operator, category } = req.body;
    let searchValues;
    if (first_operator === 'OR' && second_operator === 'AND' && third_operator === 'AND') {
        searchValues = {
            [Op.or]: [
                {
                    [Op.or]: [
                        { name: { [Op.like]: `%${keywords}%` } },
                        { description: { [Op.like]: `%${keywords}%` } }
                    ]
                },
                { is_favourited }
            ],
            [Op.and]: [
                {
                    [Op.and]: [ { is_updated }, { category }]
                }
            ]
        };
    };

    if (first_operator === 'AND' && second_operator === 'OR' && third_operator === 'AND') {
        searchValues = {
            [Op.or]: [
                {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { name: { [Op.like]: `%${keywords}%` } },
                                { description: { [Op.like]: `%${keywords}%` } }
                            ]
                        },
                        { is_updated }
                    ]
                },
                {
                    [Op.or]: [
                        { is_favourited }
                    ]
                },
                {
                    [Op.and]: [
                        { category }
                    ]
                }
            ]
        };
    };

    if (first_operator === 'OR' && second_operator === 'OR' && third_operator === 'OR') {

        searchValues = {
            [Op.or]: [
                { columnName: 'name', value: keywords },
                { columnName: 'description', value: keywords },
                { columnName: 'is_favourited', value: is_favourited },
                { columnName: 'is_updated', value: is_updated },
                { columnName: 'category', value: category }
            ].map(({ columnName, value }) => ({
                [columnName]: value
            }))
        };
    }

    if (first_operator === 'AND' && second_operator === 'AND' && third_operator === 'AND') {
        searchValues = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { name: { [Op.like]: `%${keywords}%` } },
                        { description: { [Op.like]: `%${keywords}%` } }
                    ]
                },
                { is_updated },
                { is_favourited },
                {category}
            ]
        };
    }

    try {
        const onlineShops = await OnlineShops.findAll({
            where: searchValues,
            attributes: onlineShopsAttributes
        });
        res.json(onlineShops);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `An error has occurred when fetching data. ${error.message}`
        })
    };
};