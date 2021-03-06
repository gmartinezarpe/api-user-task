import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidators';
import authRoutes from './authRoutes';
import healthRoutes from './healthRoutes';
import taskRoutes from './taskRoutes';


const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/tasks', tokenValidator(), taskRoutes)
apiRoutes.use('/auth',  authRoutes)
apiRoutes.use('/users',  authRoutes)
export default apiRoutes
