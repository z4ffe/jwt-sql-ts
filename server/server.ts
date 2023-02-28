import cors from 'cors'
import 'dotenv/config'
import express, {Request, Response} from 'express'
import db from './db'
import routes from './routes/router';

const app = express()

//

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//

app.use('/', routes)
app.get('/health', (req: Request, res: Response) => res.status(200).send('OK'))

//

const start = async (): Promise<void> => {
   try {
	  await db.sync()
	  await db.authenticate()
	  await app.listen(process.env.PORT, () => console.log(`Server launch on: ${process.env.PORT}`))
   } catch (error) {
	  console.log(error)
   }
}

start()
