import {Router} from 'express'
import {validateAuth} from '../middlewares/auth.js'
import {CategoryController} from '../controllers/categories.js'

export const categoriesRouter = Router({mergeParams: true})

categoriesRouter.get('/', validateAuth, CategoryController.getCategories)
categoriesRouter.get('/:id', validateAuth, CategoryController.getCategory)
categoriesRouter.post('/', validateAuth, CategoryController.createCategory)
categoriesRouter.put('/:id', validateAuth, CategoryController.updateCategory)