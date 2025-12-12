import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CreateVehicleSchema } from '@taller/shared/src';

export const VehicleController = {
  
  // GET /vehicles?search=AB&companyId=1
  getAll: async (req: Request, res: Response) => {
    try {
      const { search, companyId, modelId } = req.query;

      const vehicles = await prisma.vehicle.findMany({
        where: {
          AND: [
            // 1. Filtro por Empresa (Cascada)
            companyId ? { companyId: Number(companyId) } : {},
            
            // 2. Filtro por Modelo
            modelId ? { modelId: Number(modelId) } : {},
            
            // 3. Búsqueda inteligente (Patente)
            search ? {
              patente: { contains: String(search), mode: 'insensitive' }
            } : {}
          ]
        },
        include: {
          company: true, // Incluimos datos para el "Auto-rellenado" en frontend
          model: true
        },
        take: 20 // Limitar resultados para no saturar el combo
      });

      res.json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error buscando vehículos' });
    }
  },

  // POST /vehicles (Creación desde el Modal)
  create: async (req: Request, res: Response) => {
    try {
      // 1. Validar datos con Zod (Shared)
      const data = CreateVehicleSchema.parse(req.body);

      // 2. Crear en DB
      const newVehicle = await prisma.vehicle.create({
        data: {
          patente: data.patente.toUpperCase(),
          year: data.year,
          color: data.color,
          currentMileage: data.currentMileage,
          companyId: data.companyId,
          modelId: data.modelId
        },
        include: {
          company: true,
          model: true
        }
      });

      res.status(201).json(newVehicle);
    } catch (error: any) {
      // Manejo de error si la patente ya existe
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Esa patente ya existe' });
      }
      res.status(400).json({ error: error.message });
    }
  }
};