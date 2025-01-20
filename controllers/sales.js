import {SaleModel} from '../models/sale.js'
import {validateSale, validatePartialSale} from '../schemas/sales.js'

export class SaleController {
    static async getSales(req, res) {
        try {
            const sales = await SaleModel.getSales()
            res.json(sales)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getSale(req, res) {
        try {
            const {id} = req.params

            const sale = await SaleModel.getSale({id})
            if ( ! sale ) res.status(404).json({message: 'Shift not found'})
            res.json(sale)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createSale(req, res) {
        try {
            const valid = validateSale(req.body)

            if (! valid.success) res.status(422).json({message: valid.error.message})

            const createSale =  await SaleModel.createSale({body: valid.data})
            res.status(201).json({message: 'Sale has been created', shift_id: createSale})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateSale(req, res) {
        try {
            const valid = validatePartialSale(req.body)

            if ( ! valid.success ) return res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateSale = await SaleModel.updateSale({id, body: req.body})
            res.json({message: 'Sale updated successfully'})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}