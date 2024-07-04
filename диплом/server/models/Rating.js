import { Rating } from '../models/models.js';
import { Product } from '../models/models.js';
import { User } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class RatingModel {
    async getOne(productId) {
        const product = await Product.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const votes = await Rating.count({where: {productId}})
        if (votes) {
            const rates = await Rating.sum('rate', {where: {productId}})
            return {rates, votes, rating: rates/votes}
        }
        return {rates: 0, votes: 0, rating: 0}
    }

    async create(userId, productId, rate) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Товар не найден в БД');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        const rating = await Rating.create({ userId, productId, rate });
        
        // Пересчет среднего рейтинга для продукта
        const votes = await Rating.count({ where: { productId } });
        const rates = await Rating.sum('rate', { where: { productId } });
        const averageRating = rates / votes;

        // Обновление среднего рейтинга в таблице Product
        await product.update({ rating: averageRating });

        return rating;
    }
}

export default new RatingModel()