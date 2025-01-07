import { TableModel } from '../models/table.js'
import { validateTable, validatePartialTable } from '../schemas/tables.js'

export class TableController {
    static async getTables(req, res) {
        const tables = await TableModel.getTables()
        res.json(tables)
    }

    static async getTable(req, res) {
        const { id } = req.params

        const table = await TableModel.getTable({id})
        if ( ! table ) res.status(404).json({message: 'Table not found'})
        res.json(table)
    }

    static async registerTable(req, res) {
        const valid = validateTable(req.body)

        if (! valid.success) res.status(422).json({message: valid.error.message})
        
        const {name, active} = req.body
    }
}