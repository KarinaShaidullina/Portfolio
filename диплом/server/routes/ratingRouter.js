import express from 'express';
import RatingController from '../controllers/ratingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new express.Router()

router.get('/product/:productId([0-9]+)', RatingController.getOne)
router.post('/product/:productId([0-9]+)/rate/:rate([1-5])', authMiddleware, RatingController.create)

export default router