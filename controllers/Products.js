import Products from "../models/Product.js";

const productAttributes = [
    'id',
    'name',
    'description',
    'owner_first_name',
    'owner_last_name',
    'owner_email',
    'owner_phone_number',
    'image_url',
    'image_alt_text',
    'video_url',
    'price',
    'is_favourited',
    'createdAt',
    'updatedAt'
]

export const AddProduct = async(req, res) => {
    const { 
        name, 
        description, 
        owner_first_name, 
        owner_last_name, 
        owner_email, 
        owner_phone_number, 
        image_url, 
        image_alt_text, 
        video_url, 
        price,
        is_favourited
    } = req.body;
 
    try { 
        await Products.create({
            name,
            description,
            owner_first_name,
            owner_last_name,
            owner_email,
            owner_phone_number,
            image_url,
            image_alt_text,
            video_url,
            price,
            is_favourited
        });
        const products = await Products.findAll({
            attributes: productAttributes
        });
        res.json({ msg: "Product added successfully", data: products });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `There was an issue when adding a product. ${error.message}`,
            data: null
        });
    };
};

export const getProducts = async(_req, res) => {
    try {
        const products = await Products.findAll({
            attributes: productAttributes
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `An error has occurred when fetching data. ${error.message}`
        })
    };
};

export const deleteProduct = async(req, res) => {
    try {
        const result = await Products.destroy({
            where: { id: req.params.id },
            force: true
        });
        if(result === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'A product with that id is not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    };
};

// This should work for any update made on each product
export const UpdateProduct = async(req, res) => {
    try {
        const productToUpdate = await Products.findOne({ where: { id: req.params.id }});
        const product = productToUpdate.dataValues;
        // Update any keys that match the client's requests
        for (const productKey in product) {
            for (const reqKey in req.body) {
                if(productKey === reqKey) {
                    product[`${productKey}`] = req.body[`${reqKey}`]
                }
            }
        };

        await Products.update(product, {
            where: { id: req.params.id }
        });
        return res.sendStatus(200);   
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    };
};