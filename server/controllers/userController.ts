import bcrypt from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import Users from '../models/UserModel';

const userController = {
   async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
	  try {
		 const allUsers = await Users.findAll({
			attributes: ['id', 'name', 'email']
		 })
		 res.status(httpStatus.OK).json(allUsers)
	  } catch (error) {
		 next(error)
	  }
   },
   async registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	  const {name, email, password, passwordConfirmation} = req.body
	  const user = await Users.findOne({where: {email: email}})
	  if (user) return res.status(httpStatus.BAD_REQUEST).json({message: 'User with this email already registered'})
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
   async loginUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	  try {
		 const user = await Users.findOne({where: {email: req.body.email}})
		 const checkPassword: boolean = await bcrypt.compare(req.body.password, user!.password)
		 if (!checkPassword) return res.status(httpStatus.BAD_REQUEST).json({message: 'Wrong password'})
		 if (user) {
			const {id, name, email} = user
			const accessToken: string = jwt.sign({
			   id, name, email
			}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15s'})
			const refreshToken: string = jwt.sign({
			   id, name, email
			}, `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn: '1d'})
			await Users.update({'refresh-token': refreshToken}, {
			   where: {
				  id: id
			   }
			})
			res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
			res.json({accessToken})
		 }
	  } catch (error) {
		 res.status(404).json({message: 'Email not found'})
	  }
   },
   async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	  try {
		 const refreshToken = req.cookies.refreshToken
		 if (!refreshToken) return res.status(httpStatus.NO_CONTENT).end()
		 const user = await Users.findOne({where: {'refresh-token': refreshToken}})
		 if (!user) return res.status(httpStatus.NO_CONTENT).end()
		 await Users.update({'refresh-token': ''}, {where: {id: user.id}})
		 res.clearCookie('refreshToken')
		 res.status(httpStatus.OK).end()
	  } catch (error) {
		 next(error)
	  }
   }
}

export default userController
