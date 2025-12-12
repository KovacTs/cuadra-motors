//Validación para crear una empresa nueva desde el modal
import { z } from 'zod';

export const CreateCompanySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  rut: z.string().optional(), // Opcional porque a veces no lo tienen a mano en terreno
  contactEmail: z.string().email("Email inválido").optional().or(z.literal('')),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;