import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import vehicleRoutes from './routes/vehicle.routes';


// Importamos algo de la librería compartida para probar que funciona
import { PROJECT_NAME } from '@taller/shared/src/index'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev')); // Loguea peticiones en consola
app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: `Bienvenido al API de ${PROJECT_NAME}`,
    status: 'OK',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔧 Proyecto: ${PROJECT_NAME}`);
});