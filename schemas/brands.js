import {z} from 'zod'

const brandSchema = z.object({
    name: z.string({
        invalid_type_error: 'Brand name must be a string',
        required_error: 'Brand name is required'
    })
})

export function validateBrand(brand) {
    return brandSchema.safeParse(brand)
}

export function validatePartialBrand(brand) {
    return brandSchema.partial().safeParse(brand)
}