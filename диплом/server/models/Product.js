import { Product } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import FileService from '../services/File.js';
import { Category } from '../models/models.js';
import { Op } from 'sequelize';

class ProductModel {
    async search(query) {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                    { '$category.name$': { [Op.iLike]: `%${query}%` } } // добавьте это условие
                ],
            },
            include: [
                { model: Category, as: 'category' },
            ],
        });
        return products;
    }

    async getAll(options) {
        const {categoryId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        const products = await Product.findAndCountAll({where, limit, offset})
        return products
    }

    //посмотреть в конце нужны ли здесь изменения
    async getOne(id) {
        const product = await Product.findByPk(id, {
            include: [
                {model: Category, as: 'category'},
            ]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, image) {
        const img = FileService.save(image) ?? ''
        const {name, old_price, current_price, categoryId, description, product_description, additional_info} = data
        const product = await Product.create({name, old_price, current_price, img, categoryId, description, product_description, additional_info})
        return product
    }

    async update(id, data, image) {
        const product = await Product.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(image)
        // если загружено новое изображение — надо удалить старое
        if (file && product.img) {
            FileService.delete(product.img)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = product.name,
            old_price = product.old_price,
            current_price = product.current_price,
            categoryId = product.categoryId,
            description = product.description,
            product_description = product.product_description,
            additional_info = product.additional_info,
            img = file ? file : product.img
        } = data
        await product.update({name, old_price, current_price, img, categoryId, description, product_description, additional_info})
        return product
    }

    async delete(id) {
        const product = await Product.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        await product.destroy()
        return product
    }
}

export default new ProductModel()
