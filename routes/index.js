import express from "express";
import { getUsers, Register, Login, Logout, getCurrentUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { AddProduct } from "../controllers/Products.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/users/:email', getCurrentUser)
router.post('/products', AddProduct)
 
export default router;