import z from "zod"

export const foodSchema = z.object({
    title: z.string().min(3),
    type: z.string().min(3),
    quantity: z.number().positive(),
    pickupLocation: z.string().min(3),
    expirationDate: z.date().transform((date) => new Date(date))
});