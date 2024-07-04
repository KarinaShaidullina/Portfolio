import { Order} from '../models/models.js';
import { OrderItem } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class OrderModel {
    async getAll(userId = null) {
        const options = {}
        if (userId) {
            options.where = {userId}
        }
        const orders = await Order.findAll(options)
        return orders
    }

    async getOne(id, userId = null) {
        const options = {
            where: {id},
            include: [
                {model: OrderItem, as: 'items', attributes: ['id', 'name', 'price', 'quantity']},
            ],
        }
        if (userId) options.where.userId = userId
        const order = await Order.findOne(options)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        return order
    }

    async create(data) {
        console.log("Received data:", data);
        
        // общая стоимость заказа
        const items = data.items
        const total_price = items.reduce((sum, item) => sum + item.current_price * item.quantity, 0)
        // добавляем стоимость доставки, если необходимо
        const deliveryCost = total_price > 100 ? 0 : 10; // Предположим, что стоимость доставки 10
        const total_price_with_delivery = total_price + deliveryCost;

        // данные для создания заказа
        const {first_name, second_name, delivery_type, city, address, comment = null, userId = null} = data
        const order = await Order.create({
            first_name, second_name, delivery_type, city, address, comment, total_price: total_price_with_delivery, userId
        })
        console.log("Order created:", order);
        // товары, входящие в заказ
        for (let item of items) {
            await OrderItem.create({
                name: item.name,
                price: item.current_price,
                quantity: item.quantity,
                orderId: order.id
            })
        }
        // возвращать будем заказ с составом
        const created = await Order.findByPk(order.id, {
            include: [
                {model: OrderItem, as: 'items', attributes: ['name', 'price', 'quantity']},
            ],
        })
        console.log("Order with items:", created);
        return created
    }

    async delete(id) {
        let order = await Order.findByPk(id, {
            include: [
                {model: OrderItem, attributes: ['name', 'price', 'quantity']},
            ],
        })
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        await order.destroy()
        return order
    }
}

export default new OrderModel()