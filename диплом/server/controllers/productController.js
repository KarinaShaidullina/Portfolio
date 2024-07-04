import ProductModel from '../models/Product.js';
import ApiError from '../error/ApiError.js';

class ProductController {
    async search(req, res, next) {
        try {
            const { query } = req.query;
            const products = await ProductModel.search(query);
            res.json(products);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    async getAll(req, res, next) {
        try {
            const {categoryId = null} = req.params
            let {limit, page} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 12
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {categoryId, limit, page}
            const products = await ProductModel.getAll(options)
            res.json(products)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.getOne(req.params.id)
            res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const product = await ProductModel.create(req.body, req.files?.img)
            res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.update(req.params.id, req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.delete(req.params.id)
            res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}


export default new ProductController()