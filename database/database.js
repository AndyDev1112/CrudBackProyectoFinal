import oracledb from 'oracledb'
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectString: process.env.DB_HOST_XE,
  privilege: oracledb.SYSDBA
};


export async function testConnection() {
  try {
    // Intenta establecer la conexión
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión exitosa a Oracle 👌');

    // Libera la conexión

    
    await connection.close();
  } catch (error) {
    console.error('Error al conectar a Oracle:', error.message);
  }
}

// Llama a la función para probar la conexión

testConnection();




