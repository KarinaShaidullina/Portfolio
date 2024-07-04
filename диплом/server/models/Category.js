import { Category } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class CategoryModel {
    async getAll() {
        const categories = await Category.findAll()
        return categories
    }

    async getOne(id) {
        const category = await Category.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {name} = data
        const category = await Category.create({name})
        return category
    }

    async update(id, data) {
        const category = await Category.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        const {name = category.name} = data
        await category.update({name})
        return category
    }

    async delete(id) {
        const category = await Category.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        await category.destroy()
        return category
    }
}

export default new CategoryModel()