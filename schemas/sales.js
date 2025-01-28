import {z} from 'zod'

const saleSchema = z.object({
    shift_id: z.number({
        invalid_type_error: 'Sale shift_id must be a number'
    }).optional(),
    table_id: z.number({
        invalid_type_error: 'Sale table_id must be a number'
    }).optional(),
    user_id: z.number({
        invalid_type_error: 'Sale user_id must be a number',
        required_error: 'Sale user_id is required'
    }),
    state_id: z.number({
        invalid_type_error: 'Sale state_id must be a number',
        required_error: 'Sale state_id is required'
    }),
    products: z.array(
        z.object({
            id: z.number({
                invalid_type_error: 'Sale product_id must be a number',
                required_error: 'Sale product_id is required'
            }),
            quantity: z.number({
                invalid_type_error: 'Sale product quantity must be a number',
                required_error: 'Sale product quantity is required'
            })
        })
    )
})

export function validateSale(sale) {
    return saleSchema.safeParse(sale)
}

export function validatePartialSale(sale) {
    return saleSchema.partial().safeParse(sale)
}