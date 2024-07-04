import RatingModel from '../models/Rating.js';
import ApiError from '../error/ApiError.js';

class RatingController {
    async getOne(req, res, next) {
        try {
            const rating = await RatingModel.getOne(req.params.productId)
            res.json(rating)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    

    async create(req, res, next) {
        try {
            const {productId, rate} = req.params;
            const userId = req.auth.id; 
            const rating = await RatingModel.create(userId, productId, rate)
            res.json(rating)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export default new RatingController()