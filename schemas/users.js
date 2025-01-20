import {z} from 'zod'

const userSchema = z.object({
    name: z.string({
        invalid_type_error: 'User name must be a string',
        required_error: 'User name is required'
    }),
    email: z.string({required_error: 'Email is required'}).email('Invalid email'),
    password: z.string()
})

export function validateUser(user) {
    return userSchema.safeParse(user)
}

export function validatePartialUser(user) {
    return userSchema.partial().safeParse(user)
}