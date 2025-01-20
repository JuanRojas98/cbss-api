import {z} from 'zod'

const movementSchema = z.object({
    product_id: z.number({
        invalid_type_error: 'ProductId must be a number',
        required_error: 'ProductId is required'
    }),
    user_id: z.number({
        invalid_type_error: 'UserId must be a number',
        required_error: 'UserId is required'
    }),
    movement_type: z.number({
        invalid_type_error: 'Movement type must be a number',
        required_error: 'Movement type is required'
    }),
    quantity: z.number({
        invalid_type_error: 'Quantity must be a number',
        required_error: 'Quantity is required'
    })
})

export function validateMovement(movement) {
    return movementSchema.safeParse(movement)
}

export function validatePartialMovement(movement) {
    return movementSchema.partial().safeParse(movement)
}