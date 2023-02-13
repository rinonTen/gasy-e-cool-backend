import OnlineShops from "../models/OlineShop.js";

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

export const AddOnlineShop = async(req, res) => {
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
        res.json({ msg: "Shop added successfully", data: onlineShops });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `There was an issue when uploading your shop. ${error.message}`,
            data: null
        });
    };
};

export const getOnlineShops = async(_req, res) => {
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
export const updateShop = async(req, res) => {
    try {
        const shopToUpdate = await OnlineShops.findOne({ where: { id: req.params.id }});
        const shop = shopToUpdate.dataValues;
        // Update any keys/items that match the client's requests
        for (const shopKey in shop) {
            for (const reqKey in req.body) {
                if(shopKey === reqKey) {
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

export const deleteShop = async(req, res) => {
    try {
        const result = await OnlineShops.destroy({
            where: { id: req.params.id },
            force: true
        });
        if(result === 0) {
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