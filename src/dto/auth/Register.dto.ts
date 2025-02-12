import { z } from 'zod';

export const registerDtoSchema = z.object({
    email: z.string().email('Email Harus Valid'),
    password: z.string().min(6, 'Password Minimal 6 Karakter'),
})

export type RegisterDto = z.infer<typeof registerDtoSchema>
