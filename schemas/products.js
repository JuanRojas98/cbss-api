import {z} from 'zod'

const productSchema = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string',
        required_error: 'Product name is required'
    }),
    description: z.string({
        invalid_type_error: 'Product description must be a string',
    }),
    category_id: z.number({
        invalid_type_error: 'Product categoryId must be a number',
        required_error: 'Product categoryId is required'
    }),
    brand_id: z.number({
        invalid_type_error: 'Product brandId must be a number',
        required_error: 'Product brandId is required'
    }),
    quantity: z.number({
        invalid_type_error: 'Product quantity must be a number',
        required_error: 'Product quantity is required'
    }),
    price: z.number({
        invalid_type_error: 'Product price must be a number',
        required_error: 'Product price is required'
    })
})

export function validateProduct(product) {
    return productSchema.safeParse(product)
}

export function validatePartialProduct(product) {
    return productSchema.partial().safeParse(product)
}