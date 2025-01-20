import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {SaleController} from '../controllers/sales.js'

export const salesRouter = Router()

// Products
salesRouter.get('/', validateAuth, SaleController.getSales)
salesRouter.get('/:id', validateAuth, SaleController.getSale)
salesRouter.post('/', validateAuth, SaleController.createSale)
salesRouter.put('/:id', validateAuth, SaleController.updateSale)