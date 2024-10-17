// Definir el puerto del servidor, utilizando el puerto proporcionado por las variables de entorno o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Importación de módulos 
import express from 'express';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import joi from 'joi';
import dotenv from 'dotenv';
import * as controller from './crud-config/routes.js';
import router from './crud-config/routes.js';
import * as authJwt from './auth-usuario/jwt.js';
import * as database from './database/database.js';
import { loginUserSchema, addRegistrosSchema, updateRegistrosSchema } from './validations-schema/schema.js';

// Crear una instancia de la aplicación Express
const app = express(); // Mover la declaración de `app` aquí, antes de usarla

// Configuración de variables de entorno
dotenv.config();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};


// Usar el middleware cors
app.use(cors(corsOptions));

// Usar el middleware bodyParser para analizar datos de solicitud JSON
app.use(bodyParser.json());

// Usar el enrutador definido para las rutas CRUD
app.use(router);

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(` 💪 👌 Servidor escuchando en el puerto ${PORT}`);
});
