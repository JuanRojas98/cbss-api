import { z } from 'zod'

const tableSchema = z.object({
    name: z.string({
        invalid_type_error: 'User name must be a string',
        required_error: 'User name is required'
    })
})

export function validateTable(table) {
    return tableSchema.safeParse(table)
}

export function validatePartialTable(table) {
    return tableSchema.partial().safeParse(table)
}