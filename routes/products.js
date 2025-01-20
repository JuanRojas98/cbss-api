import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {ProductController} from '../controllers/products.js'
import {CategoryController} from '../controllers/categories.js'
import {BrandController} from '../controllers/brands.js'
import {MovementController} from "../controllers/movements.js";

export const productsRouter = Router()

// Products
productsRouter.get('/', validateAuth, ProductController.getProducts)
productsRouter.get('/:id', validateAuth, ProductController.getProduct)
productsRouter.post('/', validateAuth, ProductController.createProduct)
productsRouter.put('/:id', validateAuth, ProductController.updateProduct)

// Categories
productsRouter.get('/categories', validateAuth, CategoryController.getCategories)
productsRouter.get('/categories/:id', validateAuth, CategoryController.getCategory)
productsRouter.post('/categories', validateAuth, CategoryController.createCategory)
productsRouter.put('/categories/:id', validateAuth, CategoryController.updateCategory)

// Brands
productsRouter.get('/brands', validateAuth, BrandController.getBrands)
productsRouter.get('/brands/:id', validateAuth, BrandController.getBrand)
productsRouter.post('/brands', validateAuth, BrandController.createBrand)
productsRouter.put('/brands/:id', validateAuth, BrandController.updateBrand)

// Movements
productsRouter.get('/:id/movements', validateAuth, MovementController.getMovementsProduct)