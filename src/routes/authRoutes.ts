import { Router } from 'express';
import AuthController from '../controllers/AuthController';


const authRoutes = Router()
const controller = new AuthController()


authRoutes.post('/login', controller.login)
authRoutes.post('/register', controller.register)
authRoutes.put('/:id', controller.Update )
authRoutes.get('/', controller.findAll )


export default authRoutes