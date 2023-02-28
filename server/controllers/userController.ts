import bcrypt from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import Users from '../models/UserModel';

const userController = {
   async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
	  try {
		 const allUsers = await Users.findAll({
			attributes: ['id', 'name', 'email']
		 })
		 res.status(200).json(allUsers)
	  } catch (error) {
		 next(error)
	  }
   },
   async registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	  const {name, email, password, passwordConfirmation} = req.body
	  const user = await Users.findOne({where: {email: email}})
	  if (user) return res.status(400).json({message: 'User with this email already registered'})
	  if (password !== passwordConfirmation) return res.status(400).json({message: 'Passwords not same'})
	  const salt = await bcrypt.genSalt()
	  const hashedPassword = await bcrypt.hash(password, salt)
	  try {
		 const newUser = await Users.create({
			name: name,
			email: email,
			password: hashedPassword
		 })
		 res.status(200).json({message: 'User created', newUser})
	  } catch (error) {
		 next(error)
	  }
   },
   async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	  try {
		 const user = await Users.findOne({where: {email: req.body.email}})
		 const checkPassword: boolean = await bcrypt.compare(req.body.password, user!.password)
		 res.json(user)
	  } catch (error) {
		 res.status(404).json({message: 'Email not found'})
	  }
   }
}

export default userController
