import Products from "../models/Product";

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
        price 
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
            price
        });
        const products = await Products.findAll({
            attributes: [
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
                'createdAt',
                'updatedAt'
            ]
        });
        res.json({ msg: "Product added successfully", data: products });
    } catch (error) {
        res.json({ msg: "There was an issue when creating a product", data: null });
        console.log(error);
    }
};