import { ShiftModel } from '../models/shift.js'
import { validateShift, validatePartialShift } from '../schemas/shifts.js'
import {SaleModel} from "../models/sale.js";

export class ShiftController {
    static async getShifts(req, res) {
        try {
            const shifts = await ShiftModel.getShifts()
            res.json(shifts)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getShift(req, res) {
        try {
            const {id} = req.params

            const shift = await ShiftModel.getShift({id})
            if ( ! shift ) res.status(404).json({message: 'Shift not found'})
            res.json(shift)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createShift(req, res) {
        try {
            const valid = validateShift(req.body)

            if (! valid.success) res.status(422).json({message: valid.error.message})

            const shift =  await ShiftModel.createShift({body: valid.data})
            res.status(201).json({message: 'Turno registrado e iniciado.', shift})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateShift(req, res) {
        try {
            const valid = validatePartialShift(req.body)

            if ( ! valid.success ) return res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateShift = await ShiftModel.updateShift({id, body: req.body})
            res.json({message: 'Shift updated successfully'})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async closeShift(req, res) {
        try {
            const {id} = req.params

            // Validar que no existan ventas sin cerrar
            const sales = await SaleModel.getSales()

            if (sales.length > 0) return res.status(200).json({closed: 0, message: 'Unclosed sales were found.'})

            const updateShift = await ShiftModel.updateShift({id, body: {user_id: req.user_id}})
            res.json({closed: 1, message: 'Shift closed successfully'})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}