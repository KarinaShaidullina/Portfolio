import config from 'dotenv/config';
import express from 'express';
import sequelize from './db.js';
import * as models from './models/models.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandlingMiddleware.js';
import cookieParser from 'cookie-parser';
// require('dotenv').config()
// const express = require('express')
// const sequelize = require('./db')
// const models = require('./models/models')
// const cors = require('cors')
// const router = require('./routes/index')
// const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// const fileUpload = require('express-fileupload')
// const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json())
app.use(express.static('static'))
// app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser(process.env.SECRET_KEY))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(ErrorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
