import {CategoryModel} from '../models/category.js'
import {validateCategory, validatePartialCategory} from '../schemas/categories.js'

export class CategoryController {
    static async getCategories(req, res) {
        try {
            const categories = await CategoryModel.getCategories()
            res.json(categories)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getCategory(req, res) {
        try {
            const {id} = req.params

            const category = await CategoryModel.getCategory({id})
            if (!category) res.status(404).json({message: 'Category not found'})
            res.json(category)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createCategory(req, res) {
        try {
            const valid = validateCategory(req.body)

            if (!valid.success) res.status(422).json({message: valid.error.message})

            const createCategory = await CategoryModel.createCategory({body: valid.data})
            res.status(201).json({message: 'Category has been created', category_id: createCategory})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateCategory(req, res) {
        try {
            const valid = validatePartialCategory(req.body)

            if (!valid.success) return res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateCategory = await CategoryModel.updateCategory({id, body: req.body})
            res.status(201).json({message: 'Category updated successfully'})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}