import {MovementModel} from '../models/movement.js'
import {validateMovement, validatePartialMovement} from '../schemas/movements.js'

export class MovementController {
    static async getMovements(req, res) {
        try {
            const movements = await MovementModel.getMovements()
            res.json(movements)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getMovementsProduct(req, res) {
        try {
            const {id} = req.params
            const movements = await MovementModel.getMovementsProduct({id})

            if (!movements) res.status(404).json({message: 'Product movements not found'})
            res.json(movements)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createMovement(req, res) {
        try {
            const valid = validateMovement(req.body)

            if (!valid.success) res.status(422).json({message: valid.error.message})

            const createMovement = await MovementModel.createMovement({body: valid.data})
            res.status(201).json({message: 'Movement created successfully'})
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}