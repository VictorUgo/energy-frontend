# energy-backend

Energy Monitoring Platform

✨ Descripción General

Una plataforma de monitoreo energético para visualizar, filtrar y analizar datos de consumo eléctrico en tiempo real e histórico, segmentado por centro de trabajo, sensor y área.

El sistema incluye autenticación de usuario y está diseñado para desplegarse en la nube.

⚖️ Arquitectura

Tecnologías:

Frontend: React (con Material UI y ApexCharts)

Backend: Node.js (Express.js)

Autenticación: JWT

Fuente de datos: Archivo JSON simulado

Estructura General:

energy-monitor/
├── frontend/ (React + Vite + ApexCharts)
└── backend/ (Node.js + Express)

Flujo de Datos:

El backend lee un archivo JSON que simula los datos de sensores.

Provee endpoints protegidos por JWT:

/api/data - Todos los datos

/api/data/realtime - Datos últimos por sensor

/api/data/filtered - Filtrado por sensor, área, fechaInicio, fechaFin

/api/data/stats - Promedios por sensor o área

El frontend consume estas APIs, mostrando:

Gráficas interactivas de voltaje y corriente

Filtros por sensor, área, rango de fechas

🚪 Autenticación

Middleware authMiddleware.js

Valida JWT en encabezado Authorization

Requiere token para acceder a cualquier ruta /api/data/*

🔍 Funcionalidades

Backend

Lectura de archivo JSON como fuente de datos

Filtrado por centro, sensor, área y fechas

Datos en tiempo real (más reciente por sensor)

Cálculo de promedios de voltaje y corriente

Frontend

Login protegido con token

Dashboard con:

Cards resumen

Filtros de búsqueda

Gráficas interactivas con ApexCharts

🚀 Despliegue

Opcion 1: Railway (recomendado)

Backend desplegado con Railway, configurando JWT_SECRET como variable de entorno

Frontend construido con npm run build y desplegado en Vercel o Netlify

Opcion 2: Render

Crear servicios web para backend y frontend con sus respectivos repositorios

📚Energy Monitoring Platform

✨ Descripción General

Una plataforma de monitoreo energético para visualizar, filtrar y analizar datos de consumo eléctrico en tiempo real e histórico, segmentado por centro de trabajo, sensor y área.

El sistema incluye autenticación de usuario y está diseñado para desplegarse en la nube.

⚖️ Arquitectura

Tecnologías:

Frontend: React (con Material UI y ApexCharts)

Backend: Node.js (Express.js)

Autenticación: JWT

Fuente de datos: Archivo JSON simulado

Estructura General:

energy-monitor/
├── frontend/ (React + Vite + ApexCharts)
└── backend/ (Node.js + Express)

Flujo de Datos:

El backend lee un archivo JSON que simula los datos de sensores.

Provee endpoints protegidos por JWT:

/api/data - Todos los datos

/api/data/realtime - Datos últimos por sensor

/api/data/filtered - Filtrado por sensor, área, fechaInicio, fechaFin

/api/data/stats - Promedios por sensor o área

El frontend consume estas APIs, mostrando:

Gráficas interactivas de voltaje y corriente

Filtros por sensor, área, rango de fechas

🚪 Autenticación

Middleware authMiddleware.js

Valida JWT en encabezado Authorization

Requiere token para acceder a cualquier ruta /api/data/*

🔍 Funcionalidades

Backend

Lectura de archivo JSON como fuente de datos

Filtrado por centro, sensor, área y fechas

Datos en tiempo real (más reciente por sensor)

Cálculo de promedios de voltaje y corriente

Frontend

Login protegido con token

Dashboard con:

Cards resumen

Filtros de búsqueda

Gráficas interactivas con ApexCharts

🚜 Segregación de datos por centro

Aunque actualmente todos los datos están disponibles globalmente, se puede extender la autenticación JWT para incluir centros permitidos por usuario.

🌐 URL de despliegue:

Backend: https://energy-monitor-backend.onrender.com

Frontend: https://energy-monitor-frontend.vercel.app

🔢 Buenas Prácticas

Modularización clara (routes, controllers, utils, middleware)

Validación de parámetros y errores HTTP

Autenticación protegida con JWT

Uso de MUI + ApexCharts para UX limpia y visual

💼 Autor

Victor HernandezDesarrollador Full Stack

