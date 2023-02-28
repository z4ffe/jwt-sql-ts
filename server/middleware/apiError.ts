import {NextFunction, Request, Response} from 'express';
import * as httpStatus from 'http-status';

export interface IError {
   statusCode: number
   message: string
}


class ApiError extends Error {
   public statusCode: number
   constructor(statusCode: number, message: string) {
	  super();
	  this.statusCode = statusCode
	  this.message = message
   }
}

const handleError = (error: IError, res: Response): void => {
   const {statusCode, message} = error
   res.status(statusCode).json(message)
}

const convertToApiError = (err: IError, req: Request, res: Response, next: NextFunction): void => {
   let error = err
   if (!(error instanceof ApiError)) {
	  const statusCode = error.statusCode
	  const message = error.message || httpStatus[statusCode]!.toString()
	  error = new ApiError(statusCode, message)
   }
   next(error)
}

export {ApiError, handleError, convertToApiError}
