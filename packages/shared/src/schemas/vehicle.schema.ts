import { z } from 'zod';

// Esquema para CREAR un auto nuevo
export const CreateVehicleSchema = z.object({
  patente: z.string().length(6, "La patente debe tener 6 caracteres").regex(/^[A-Z0-9]+$/, "Solo letras y números"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  color: z.string().optional(),
  
  // Relaciones (IDs)
  companyId: z.number({ required_error: "Debes asociar una empresa" }),
  modelId: z.number({ required_error: "Debes seleccionar un modelo" }),
  
  currentMileage: z.number().default(0),
});

// Esquema para BUSCAR autos (Filtros)
export const VehicleFilterSchema = z.object({
  search: z.string().optional(),    // Texto libre (patente)
  companyId: z.string().optional(), // Viene como string por la URL query param
  modelId: z.string().optional(),
});

export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;