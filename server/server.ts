import cors from 'cors'
import 'dotenv/config'
import express, {Request, Response} from 'express'
import httpStatus from 'http-status';
import db from './db'
import routes from './routes/router';
import cookieParser from 'cookie-parser'

const app = express()

//

app.use(cors({ credentials:true, origin:'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//

app.use('/', routes)
app.get('/health', (req: Request, res: Response) => res.status(httpStatus.OK).send('OK'))

//

const start = async (): Promise<void> => {
   try {
	  await db.sync()
	  await db.authenticate()
	  app.listen(process.env.PORT, () => console.log(`Server launch on: ${process.env.PORT}`))
   } catch (error) {
	  console.log(error)
   }
}

start()
