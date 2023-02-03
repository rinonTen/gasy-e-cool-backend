import Users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(_req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id','first_name','last_name', 'email', 'password', 'createdAt', 'updatedAt']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { first_name, last_name, email, password } = req.body;
 
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const existingEmail = await Users.findOne({ where: { email }});
        const isEmailInUse = email === existingEmail?.email;
        if(isEmailInUse) {
            return res.status(400).json({ msg: 'Email already in use', data: null });
        } else {
            await Users.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashPassword
            });
            const users = await Users.findAll({
                attributes: ['id','first_name','last_name', 'email', 'createdAt', 'updatedAt']
            });
            res.json({ msg: "Registration Successful", data: users });
        }
    } catch (error) {
        return res.json(error);
    }
};

export const getCurrentUser = async(req, res) => {
    const { params } = req;
    try {
        const user = await Users.findOne({
            where: {
                email: params.email
            }
        });
      return  res.json(user);
    } catch (error) {
        res.json(error);
    }
};
 
export const Login = async(req, res) => {
    try {

        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const first_name = user[0].first_name;
        const last_name = user[0].last_name;
        const email = user[0].email;

        const accessToken = jwt.sign({ userId, first_name, last_name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });

        const refreshToken = jwt.sign({ userId, first_name, last_name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where:{
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (error) {
        res.json(error);
    }
}

export const Logout = async(req, res) => {
    try {
        await Users.update({ refresh_token: null }, {
            where: { email: req.body.email }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);   
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}
