import express from 'express'
import tokenController from '../controllers/tokenController';
import userController from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router()

router.get('/users', verifyToken, userController.getUsers)
router.get('/token', tokenController.refreshToken)
router.post('/users', userController.registerUser)
router.post('/login', userController.loginUser)
router.delete('/logout', userController.logoutUser)

export default router
