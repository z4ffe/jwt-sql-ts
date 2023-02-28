import {Sequelize} from 'sequelize';

const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PW}`, {
   host: '127.0.0.1',
   dialect: 'mysql',
   port: Number(`${process.env.DB_PORT}`)
})

export default db
