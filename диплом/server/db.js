import {Sequelize} from 'sequelize';

export default new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            underscored: true, // использовать snake_case вместо camelCase для полей таблиц БД
            timestamps: false, // не добавлять поля created_at и updated_at при создании таблиц
        }
    }
)