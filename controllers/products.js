import {ProductModel} from '../models/product.js'
import {validateProduct, validatePartialProduct} from '../schemas/products.js'
import {MovementModel} from "../models/movement.js";

export class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await ProductModel.getProducts()
            res.json(products)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getProduct(req, res) {
        try {
            const {id} = req.params
            const product = await ProductModel.getProduct({id})

            if (!product) res.status(404).json({message: 'Product not found'})
            res.json(product)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async createProduct(req, res) {
        try {
            const valid = validateProduct(req.body)

            if (!valid.success) res.status(422).json({message: valid.error.message})

            const createProduct = await ProductModel.createProduct({body: valid.data})
            const createMovement = await MovementModel.createMovement({body: {product_id: createProduct, user_id: req.user_id, movement_type: 1, quantity: valid.data.quantity, sale_id: 0}})
            res.status(201).json({message: 'El producto ha sido creado.', product_id: createProduct})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateProduct(req, res) {
        try {
            const valid = validatePartialProduct(req.body)

            if (!valid.success) res.status(422).json({message: valid.error.message})

            const {id} = req.params
            const updateProduct = await ProductModel.updateProduct({id, body: req.body})
            res.json({message: 'Producto actualizado exitosamente.'})
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}