import CategoryModel from '../models/Category.js';
import ApiError from '../error/ApiError.js';

// const { Category } = require('../models/models')
// const ApiError = require('../error/ApiError');

class CategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.getAll()
            res.json(categories)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.getOne(req.params.id)
            res.json(category)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const category = await CategoryModel.create(req.body)
            res.json(category)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.update(req.params.id, req.body)
            res.json(category)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.delete(req.params.id)
            res.json(category)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export default new CategoryController()