import {NextFunction, Request, Response} from 'express';
import * as httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   if (!token) return res.status(httpStatus.UNAUTHORIZED).end()
	jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (error, decoded) => {
	   if (error) return res.status(httpStatus.FORBIDDEN).end()
	   // @ts-ignore
	   req.body.email = decoded.email
	   next()
	})
}

export default verifyToken
