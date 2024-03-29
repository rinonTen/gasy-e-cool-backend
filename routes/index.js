import express from "express";
import { getUsers, Register, Login, Logout, getCurrentUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { AddProduct, deleteProduct, filterProducts, getProducts, UpdateProduct } from "../controllers/Products.js";
import { AddOnlineShop, deleteShop, filterShops, getOnlineShops, updateShop } from "../controllers/OnlineShops.js";
import { getShopCategories } from "../controllers/ShopCategories.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.put('/logout', Logout);
router.get('/users/:email', getCurrentUser);
router.post('/products', AddProduct);
router.put('/products/:id', UpdateProduct)
router.delete('/products/:id', deleteProduct);
router.get('/products/all', getProducts);
router.post('/products/filters', filterProducts);
router.post('/online-shops', AddOnlineShop);
router.get('/online-shops/all', getOnlineShops);
router.put('/online-shops/:id', updateShop);
router.delete('/online-shops/:id', deleteShop);
router.post('/online-shops/filters', filterShops);
router.get('/online-shops/categories', getShopCategories);

export default router;