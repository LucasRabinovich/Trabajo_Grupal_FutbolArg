# ⚽ Fixture ARG

Aplicación web desarrollada con Vue 3 para consultar información del fútbol argentino, gestionar jugadores, visualizar estadísticas y utilizar herramientas de Inteligencia Artificial para análisis y consultas deportivas.

---

# 🎯 Objetivo

El objetivo de la aplicación es brindar una plataforma que permita a los usuarios acceder a información relevante del fútbol argentino, incluyendo partidos, equipos, posiciones, estadísticas y jugadores.

La aplicación incorpora diferentes perfiles de usuario, funcionalidades administrativas y herramientas de Inteligencia Artificial para enriquecer la experiencia de uso.

---

# 🚀 Funcionalidades

## Usuarios

- Registro de usuarios
- Inicio de sesión
- Gestión de perfiles
- Roles diferenciados (Administrador / Usuario)

## Equipos

- Visualización de equipos
- Consulta de escudos e información general
- Selección de equipo favorito

## Partidos

- Consulta de próximos partidos
- Visualización de fixtures
- Información de fecha y horario

## Posiciones

- Tabla de posiciones
- Estadísticas generales por equipo

## Estadísticas

- Ranking de goleadores
- Ranking de asistidores
- Vallas invictas

## Gestión de Jugadores (ABM)

Funcionalidad exclusiva para administradores:

- Alta de jugadores
- Modificación de jugadores
- Eliminación de jugadores
- Consulta de jugadores registrados

Persistencia mediante MockAPI.

## Dashboard Administrativo

Funcionalidad exclusiva para administradores:

- Reportes deportivos
- Métricas generales
- Estadísticas de jugadores
- Indicadores para análisis

## Inteligencia Artificial

- Chat interactivo
- Consultas relacionadas con fútbol argentino
- Generación de análisis deportivos

---

# 🛠 Tecnologías Utilizadas

- Vue 3
- Composition API
- Vue Router
- Axios
- MockAPI
- API-Football
- Google Gemini AI
- Git & GitHub

---

# ⚙️ Configuración

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Generar build

```bash
npm run build
```

---

# 🔑 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto utilizando como referencia `.env.example`.

Ejemplo:

```env
VITE_MOCKAPI_URL=TU_URL_MOCKAPI

VITE_API_FOOTBALL_KEY=TU_API_FOOTBALL_KEY

VITE_GEMINI_API_KEY=TU_GEMINI_API_KEY
```

---

# 👥 Roles

## Usuario

Puede:

- Consultar partidos
- Consultar equipos
- Consultar posiciones
- Consultar estadísticas
- Utilizar funcionalidades de IA
- Gestionar su perfil

## Administrador

Además de las funcionalidades de usuario:

- Gestionar jugadores (ABM)
- Acceder al dashboard administrativo
- Consultar reportes y análisis

---

# 📚 Trabajo Práctico Final

Materia: Desarrollo Web Front-End

El proyecto integra los conceptos trabajados durante la cursada:

- Vue 3
- Composition API
- Vue Router
- Consumo de APIs
- Persistencia mediante REST API
- Gestión de usuarios y roles
- Dashboards e informes
- Integración con Inteligencia Artificial

---

