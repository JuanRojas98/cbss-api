import {z} from 'zod'

const shiftSchema = z.object({
    // start: z.date({
    //     invalid_type_error: 'Shift start must be a date',
    //     required_error: 'Shift start is required'
    // }),
    // end: z.date({
    //     invalid_type_error: 'Shift end must be a date'
    // }).optional(),
    user_id: z.number({
        invalid_type_error: 'Shift user_id must be a number',
        required_error: 'Shift user_id is required'
    })
})

export function validateShift(shift) {
    return shiftSchema.safeParse(shift)
}

export function validatePartialShift(shift) {
    return shiftSchema.partial().safeParse(shift)
}