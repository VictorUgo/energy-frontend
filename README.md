Energy Monitoring Platform

Una plataforma de monitoreo energético para visualizar, filtrar y analizar datos de consumo eléctrico en tiempo real e histórico, segmentado por centro de trabajo, sensor y área.

✨ Descripción General

La plataforma permite a los usuarios monitorear el comportamiento eléctrico de tres centros de trabajo mediante sensores distribuidos por áreas. Las lecturas incluyen voltaje y corriente cada 15 minutos.

El sistema incluye:

Visualización de datos en tiempo real

Filtrado por sensor, área y fechas

Cálculo de estadísticas

Autenticación JWT

Despliegue en la nube

📌 Objetivo del Proyecto

Desarrollar una plataforma de monitoreo energético que utilice datos de consumo energético para tres centros de trabajo, distribuidos en diferentes áreas y con varios sensores por centro. La plataforma debe mostrar el voltaje y la corriente en tiempo real por sensor, permitir la visualización eficiente de los datos, filtrar por centro, sensor, área y fechas, y desplegarse completamente en la nube.

⚖️ Arquitectura

Tecnologías Utilizadas:

Frontend: React + Vite + Material UI + ApexCharts

Backend: Node.js + Express.js

Autenticación: JWT

Fuente de Datos: Archivo JSON local (simulado)

Estructura General

energy-monitor/
├── frontend/    # React (Vite)
└── backend/     # Node.js (Express)

Flujo de Datos

El backend lee un archivo data.json con lecturas de sensores.

Expone las siguientes rutas:

GET /api/data - Todos los datos

GET /api/data/realtime - Última lectura por sensor

GET /api/data/filtered - Filtrado por sensor, área, fechaInicio y fechaFin

GET /api/data/stats - Promedios por sensor o área

El frontend consume estas rutas y muestra:

Gráficas interactivas

Filtros por sensor, área, fechas

Estadísticas en tabla

🚪 Autenticación

Middleware: authMiddleware.js

Verifica el token JWT enviado en Authorization: Bearer <token>

Protege todas las rutas que comienzan con /api/data/*

🔍 Funcionalidades

Backend:

Lectura de archivo JSON

Filtro por centro, sensor, área, fechas

Datos en tiempo real (por sensor)

Promedios de voltaje y corriente

Frontend:

Login con protección de token

Dashboard:

Cards resumen

Filtros de búsqueda

Gráficas interactivas con ApexCharts

Tabla con promedios

🚜 Segregación de Datos por Centro

Actualmente todos los datos están disponibles globalmente. Sin embargo, el sistema está preparado para restringir accesos por centro según el usuario autenticado mediante el token JWT. Esta funcionalidad puede extenderse fácilmente si se desea controlar el acceso por centro de trabajo.

🚀 Despliegue

Backend (AWS EC2 - Ubuntu):

Conectarse vía SSH a la instancia EC2.

Instalar Node.js y Git.

Clonar el repositorio y entrar al proyecto:

git clone https://github.com/VictorUgo/energy-backend.git
cd energy-backend

Instalar dependencias:

npm install

Crear archivo .env con:

JWT_SECRET=tu_clave_secreta

Ejecutar:

node server.js

(o con PM2 para modo background)

npm install -g pm2
pm2 start server.js --name energy-backend

Asegurar el puerto 4002 en el grupo de seguridad EC2.

Frontend (Vercel):

Clonar el repositorio:

git clone https://github.com/VictorUgo/energy-frontend.git
cd energy-frontend

Crear archivo .env con:

VITE_API_URL=https://<tu-backend-en-ec2>

Ejecutar en desarrollo:

npm install
npm run dev

Para producción:

Subir a GitHub

Conectar Vercel con GitHub

Agregar variables de entorno en configuración de Vercel

Vercel desplegará automáticamente desde la rama principal

🔗 URLs

Backend: https://

Frontend: https://energy-monitor-frontend.vercel.app

Repositorio Frontend: https://github.com/VictorUgo/energy-frontend

Repositorio Backend: https://github.com/VictorUgo/energy-backend

📄 Buenas Prácticas

Modularización de código (routes, controllers, utils, middleware)

Validación de errores y parámetros

Protección de rutas con JWT

Interfaz limpia con Material UI y ApexCharts

📝 Criterios de Evaluación

✅ Funcionalidad y Completitud: Todas las funciones requeridas están implementadas.

✅ Calidad del Código: Estructura modular, buenas prácticas y comentarios claros.

✅ Frontend Atractivo: Navegación fluida, filtros claros y diseño limpio.

✅ Despliegue Correcto: Backend y frontend accesibles en la nube.

✅ Documentación Clara: Instrucciones de uso, despliegue y contexto técnico completo.

💼 Autor

Victor HernandezDesarrollador Full StackLinkedIn