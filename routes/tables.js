import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {TableController} from '../controllers/tables.js'

export const tablesRouter = Router()

tablesRouter.get('/', validateAuth, TableController.getTables)
tablesRouter.get('/:id', validateAuth, TableController.getTable)
tablesRouter.post('/', validateAuth, TableController.registerTable)
tablesRouter.put('/:id', validateAuth, TableController.updateTable)