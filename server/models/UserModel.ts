import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import db from '../db'

interface Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
   id?: number
   name: string
   email: string
   password: string
   'refresh-token'?: string
}

const Users = db.define<Users>('Users', {
   name: {
	  type: DataTypes.STRING,
   },
   email: {
	  type: DataTypes.STRING
   },
   password: {
	  type: DataTypes.STRING
   },
   'refresh-token': {
	  type: DataTypes.STRING,
   }
}, {
   freezeTableName: true
});

export default Users
