Para descargar y ejecutar el proyecto

Tener instalado:
git
node
docker desktop 

ejecutar: "git clone https://github.com/KovacTs/cuadra-motors.git" en carpeta de proyecto en pc: "cuadra-motors"

instalar dependencias:
en terminal dentro de carpeta root del proyecto: "npm install"

levantar servicios: "docker-compose up -d"

sincronizar BD: en la terminal ubicado en /apps/server/: "npx prisma migrate dev"

correr todo con "npm run dev" 

Listo, deberia funcionar xdd
