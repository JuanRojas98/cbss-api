import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {ShiftController} from '../controllers/shifts.js'

export const shiftsRouter = Router()

// Products
shiftsRouter.get('/', validateAuth, ShiftController.getShifts)
shiftsRouter.get('/:id', validateAuth, ShiftController.getShift)
shiftsRouter.post('/', validateAuth, ShiftController.createShift)
shiftsRouter.put('/:id', validateAuth, ShiftController.updateShift)
shiftsRouter.post('/:id/close', validateAuth, ShiftController.closeShift)