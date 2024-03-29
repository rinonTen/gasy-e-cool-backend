import Users from "../models/User.js";
import jwt from "jsonwebtoken";
 
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });

        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, _decoded) => {
            if(err) return res.sendStatus(403);
            const id = user[0].id;
            const first_name = user[0].first_name;
            const last_name = user[0].last_name;
            const email = user[0].email;
            const accessToken = jwt.sign({ id, first_name, last_name, email }, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}