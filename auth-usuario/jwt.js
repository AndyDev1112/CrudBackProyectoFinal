import jwt from 'jsonwebtoken'
import oracledb from 'oracledb'
import { dbConfig } from '../database/database.js';

// Obtener la clave secreta para firmar los tokens JWT desde las variables de entorno
export const secretKey = process.env.secretKey;

// Middleware para verificar el token en las solicitudes HTTP
export function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({
      message: "Token inválido"
    });
  }
};


