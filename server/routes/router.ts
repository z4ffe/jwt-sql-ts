import express from 'express'
import userController from '../controllers/userController';
const router = express.Router()

router.get('/users', userController.getUsers)
router.post('/users', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

export default router
