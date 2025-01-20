import {z} from 'zod'

const categorySchema = z.object({
    name: z.string({
        invalid_type_error: 'Category name must be a string',
        required_error: 'Category name is required'
    })
})

export function validateCategory(category) {
    return categorySchema.safeParse(category)
}

export function validatePartialCategory(category) {
    return categorySchema.partial().safeParse(category)
}