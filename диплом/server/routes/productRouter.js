import express from 'express';
import ProductController from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getall', ProductController.getAll)
router.get('/getone/:id([0-9]+)', ProductController.getOne)
router.post('/create', authMiddleware, adminMiddleware, ProductController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.delete)
// список товаров выбранной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/search', ProductController.search);



export default router