import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import * as httpStatus from 'http-status';
import Users from '../models/UserModel';

const tokenController = {
   async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	  try {
		 const refreshToken: string = req.cookies.refreshToken
		 if (!refreshToken) return res.status(httpStatus.UNAUTHORIZED).end()
		 const user = await Users.findOne({where: {'refresh-token': refreshToken}})
		 if (!user) return res.status(httpStatus.FORBIDDEN).end()
		 jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (error, decoded) => {
			if (error) return res.status(httpStatus.FORBIDDEN).end()
			const {id, name, email} = user
			const accessToken = jwt.sign({id, name, email}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15s'})
			res.json({accessToken})
		 })
	  } catch (error) {
		 next(error)
	  }
   }
}

export default tokenController
