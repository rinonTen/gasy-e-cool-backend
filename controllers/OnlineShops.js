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
    'updatedAt'
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
        res.json({ msg: "Product added successfully", data: onlineShops });
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
}