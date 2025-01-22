import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {UsersController} from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', validateAuth, UsersController.getUsers)
usersRouter.get('/:id', validateAuth, UsersController.getUser)
usersRouter.post('/', validateAuth, UsersController.registerUser)
usersRouter.put('/:id', validateAuth, UsersController.updateUser)
usersRouter.post('/login', UsersController.login)
usersRouter.post('/refresh', UsersController.refreshToken)