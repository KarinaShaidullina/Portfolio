import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    phone_number: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    old_price: {type: DataTypes.INTEGER, allowNull: false},
    current_price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, unique: true, allowNull: false},
    product_description: {type: DataTypes.TEXT, unique: true, allowNull: false},
    additional_info: {type: DataTypes.TEXT, unique: true, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

// const ProductInfo = sequelize.define('product_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     description: {type: DataTypes.STRING, unique: true, allowNull: false},
//     product_description: {type: DataTypes.STRING, unique: true, allowNull: false},
//     additional_info: {type: DataTypes.STRING, unique: true, allowNull: false},
// })

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    second_name: {type: DataTypes.STRING},
    delivery_type: {type: DataTypes.ENUM('courier', 'pickup')},
    comment:{type: DataTypes.STRING},
    city:{type: DataTypes.STRING},
    address:{type: DataTypes.STRING},
    total_price: {type: DataTypes.INTEGER},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
})

const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})


Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})

Product.hasMany(Rating)
Rating.belongsTo(Product)
User.hasMany(Rating)
Rating.belongsTo(User)

Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)

// User.hasMany(Basket)
// Basket.belongsTo(User)





// User.hasMany(Rating)
// Rating.belongsTo(User)

// User.hasMany(Order)
// Order.belongsTo(User)

// Basket.hasMany(BasketProduct)
// BasketProduct.belongsTo(Basket)

// Product.hasOne(BasketProduct)
// BasketProduct.belongsTo(Product)

// Category.hasMany(Product)
// Product.belongsTo(Category)

// Product.hasMany(Rating)
// Rating.belongsTo(Product)

// Product.hasOne(ProductInfo)
// ProductInfo.belongsTo(Product)

export {
    User,
    Basket,
    BasketProduct,
    Product,
    Category,
    Rating,
    Order,
    OrderItem
}