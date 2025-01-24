import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {ProductController} from '../controllers/products.js'
import {CategoryController} from '../controllers/categories.js'
import {BrandController} from '../controllers/brands.js'
import {MovementController} from "../controllers/movements.js";
import {categoriesRouter} from "./categories.js";

export const productsRouter = Router({mergeParams: true})

// Products
productsRouter.get('/', validateAuth, ProductController.getProducts)
productsRouter.get('/:id([0-9]{6})', validateAuth, ProductController.getProduct)
productsRouter.post('/', validateAuth, ProductController.createProduct)
productsRouter.put('/:id', validateAuth, ProductController.updateProduct)

// Categories

productsRouter.use('/categories', categoriesRouter)
// productsRouter.post('/categories', validateAuth, CategoryController.createCategory)
// productsRouter.get('/categories/:id([0-9]{6})', validateAuth, CategoryController.getCategory)
// productsRouter.post('/categories', validateAuth, CategoryController.createCategory)
// productsRouter.put('/categories/:id([0-9]{6})', validateAuth, CategoryController.updateCategory)

// Brands
// productsRouter.get('/brands', validateAuth, BrandController.getBrands)
// productsRouter.get('/brands/:id', validateAuth, BrandController.getBrand)
// productsRouter.post('/brands', validateAuth, BrandController.createBrand)
// productsRouter.put('/brands/:id', validateAuth, BrandController.updateBrand)

// Movements
productsRouter.get('/:id/movements', validateAuth, MovementController.getMovementsProduct)