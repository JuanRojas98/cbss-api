import {TableModel} from '../models/table.js'
import {validateTable, validatePartialTable} from '../schemas/tables.js'
import {UserModel} from "../models/user.js";

export class TableController {
    static async getTables(req, res) {
        try {
            const tables = await TableModel.getTables()
            res.json(tables)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getTable(req, res) {
        try {
            const {id} = req.params

            const table = await TableModel.getTable({id})
            if (!table) res.status(404).json({message: 'Table not found'})
            res.json(table)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async registerTable(req, res) {
        try {
            const valid = validateTable(req.body)

            if (!valid.success) res.status(422).json({message: valid.error.message})

            const createTable = await TableModel.createTable({body: valid.data})
            res.status(201).json({message: 'Table has been created', table_id: createTable})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateTable(req, res) {
        try {
            const valid = validatePartialTable(req.body)

            if (!valid.success) return res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateTable = await TableModel.updateTable({id, body: req.body})
            res.json({message: 'Table updated successfully'})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}