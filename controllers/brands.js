import { BrandModel } from '../models/brand.js'
import { validateBrand, validatePartialBrand } from '../schemas/brands.js'

export class BrandController {
    static async getBrands(req, res) {
        try {
            const brands = await BrandModel.getBrands()
            res.json(brands)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getBrand(req, res) {
        try {
            const {id} = req.params

            const brand = await BrandModel.getBrand({id})
            if ( ! brand ) res.status(404).json({message: 'Brand not found'})
            res.json(brand)
        }
        catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createBrand(req, res) {
        try {
            const valid = validateBrand(req.body)

            if (! valid.success) res.status(422).json({message: valid.error.message})

            const createBrand =  await BrandModel.createBrand({body: valid.data})
            res.status(201).json({message: 'Brand has been created', category_id: createBrand})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateBrand(req, res) {
        try {
            const valid = validatePartialBrand(req.body)

            if ( ! valid.success ) return res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateBrand = await BrandModel.updateBrand({id, body: req.body})
            res.status(201).json({message: 'Brand updated successfully'})
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}