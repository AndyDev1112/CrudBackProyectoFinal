import express from 'express';
import * as controller from './controller.js'
import { verifyToken } from '../auth-usuario/jwt.js';
import { Router } from 'express';

// Crear un enrutador de Express

const router = express.Router();

// Ruta para iniciar sesión

router.post('/api/login', controller.loginUser); 

// Ruta para obtener todos los registros (Ruta protegida)

router.get('/api/registros', verifyToken, controller.getAllRegistros);

// Ruta para agregar un nuevo registro (Ruta protegida)

router.post('/api/registros', verifyToken, controller.addRegistros);

// Ruta para actualizar un registro por su ID (Ruta protegida)

router.put('/api/registros/:id', verifyToken, controller.updateRegistros);

// Ruta para eliminar un registro por su ID (Ruta protegida)

router.delete('/api/registros/:id', verifyToken, controller.deleteRegistros);


// Exportar el enrutador

export default router;







