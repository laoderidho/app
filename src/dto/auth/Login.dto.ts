import { z } from 'zod';

export const loginDtoSchema = z.object({
    email: z.string().email('Email Harus Valid'),
    password: z.string().min(6, 'Password Minimal 6 Karakter'),
})

export type LoginDto = z.infer<typeof loginDtoSchema>