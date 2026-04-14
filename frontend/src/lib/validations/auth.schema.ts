import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail invalido.'),
  password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres.'),
})
