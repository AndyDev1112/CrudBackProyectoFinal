import jwt from 'jsonwebtoken';
import { secretKey } from '../auth-usuario/jwt.js';
import oracledb from 'oracledb';
import { dbConfig } from '../database/database.js';
import { loginUserSchema, addRegistrosSchema, updateRegistrosSchema } from '../validations-schema/schema.js';


// Controlador para el endpoint de inicio de sesión de usuario
export async function loginUser(req, res) {
    try {
        // Validar los datos de entrada
        const { error, value } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Continuar con el inicio de sesión si los datos son válidos
        const { email, password } = req.body;
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            'BEGIN SP_LOGIN_USER(:email, :password, :result); END;',
            {
                email: email,
                password: password,
                result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
            }
        );

        const resultSet = result.outBinds.result;
        const idRows = await resultSet.getRows(1);
        
        if (idRows.length > 0) {
            const id = idRows[0][0]; // Obtener el ID del primer registro
            const token = jwt.sign({ id }, secretKey, { expiresIn: '20h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }

        await resultSet.close();
        await connection.close();
    } catch (error) {
        console.error('Error al verificar las credenciales:', error.message);
        res.status(500).json({ error: 'Error al verificar las credenciales' });
    }
};

// Función para obtener todos los registros desde la base de datos. (Ruta protegida)
export async function getAllRegistros(req, res) {
    jwt.verify(req.token, secretKey, async (error) => {
        if (error) return res.status(401).json({ message: "Token inválido" });
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute('BEGIN GET_REGISTROS(:cursor); END;', { cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } });
            const resultSet = result.outBinds.cursor;
            const rows = await resultSet.getRows();
            const metaData = resultSet.metaData.map(col => col.name);
            await resultSet.close(); 
            await connection.close();

            // Convertir los datos a minúsculas
            const registros = rows.map(row => {
                let registro = {};
                row.forEach((value, index) => {
                    registro[metaData[index].toLowerCase()] = (typeof value === 'string') ? value.toLowerCase() : value;
                });
                return registro;
            });

            res.status(200).json(registros);
        } catch (error) {
            console.error('Error al obtener registros:', error.message);
            res.status(500).json({ error: 'Error al obtener registros' });
        }
    });
};




//  Función para agregar registros desde la base de datos. (Ruta protegida)

export async function addRegistros(req, res) {
    //verificar el token utilizando clave secreta
    jwt.verify(req.token, secretKey, async (error) => {
        if (error) {
            res.status(401).json({
                message: "Token inválido"
            });
        } else {
            try {
                const { id, nombre, apellido, email, password } = req.body;
                // Validar los datos de entrada
                const { error: validationError } = addRegistrosSchema.validate({ id, nombre, apellido, email, password });
                if (validationError) {
                    return res.status(400).json({ error: validationError.details[0].message });
                }
                const connection = await oracledb.getConnection(dbConfig);
                const result = await connection.execute('BEGIN INSERTAR_USUARIO(:id, :nombre, :apellido, :email, :password); END;',
                    {
                        id: id,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        password: password
                    },
                    { autoCommit: true }
                );
                await connection.close();
                res.status(201).json({ message: 'Registro agregado con éxito' });
            } catch (error) {
                console.error('Error al agregar el registro:', error.message);
                res.status(500).json({ error: 'Error al agregar el registro' });
            }
        }
    });
};

// Función para actualizar un registro en la base de datos por su ID. (Ruta protegida)

export async function updateRegistros(req, res) {
    //verificar el token utilizando clave secreta
    jwt.verify(req.token, secretKey, async (error) => {
        if (error) {
            res.status(401).json({
                message: "Token inválido"
            });
        } else {
            try {
                const { id, nombre, apellido, email, password } = req.body;
                // Validar los datos de entrada
                const { error: validationError } = updateRegistrosSchema.validate({ id, nombre, apellido, email, password });
                if (validationError) {
                    return res.status(400).json({ error: validationError.details[0].message });
                }
                const connection = await oracledb.getConnection(dbConfig);
                const result = await connection.execute('BEGIN ACTUALIZAR_USUARIO(:id, :nombre, :apellido, :email, :password); END;',
                    {
                        id: id,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        password: password
                    },
                    { autoCommit: true }
                );
                await connection.close();
                res.status(200).json({ message: 'Registro actualizado con éxito' });
            } catch (error) {
                console.error('Error al actualizar el registro:', error.message);
                res.status(500).json({ error: 'Error al actualizar el registro' });
            }
        }
    });
};

// Función para eliminar un registro de la base de datos por su ID. (Ruta protegida)

export async function deleteRegistros(req, res) {
    //verificar el token utilizando clave secreta
    jwt.verify(req.token, secretKey, async (error) => {
        if (error) {
            res.status(401).json({
                message: "Token inválido"
            });
        } else {
            try {
                const connection = await oracledb.getConnection(dbConfig);
                const result = await connection.execute(
                    'BEGIN ELIMINAR_USUARIO(:id); END;',
                    { id: req.params.id },
                    { autoCommit: true }
                );
                await connection.close();
                res.status(200).json({ message: 'Registro eliminado con éxito' });
            } catch (error) {
                console.error('Error al eliminar el registro:', error.message);
                res.status(500).json({ error: 'Error al eliminar el registro' });
            }
        }
    });
};



// Función para ejecutar todas las funciones en paralelo
export async function ejecutarFunciones(req, res) {
    try {
        // Usamos Promise.all para ejecutar todas las funciones en paralelo
        const resultados = await Promise.all([funcionPromise1(), funcionPromise2(), funcionPromise3()]);
        console.log('Todos los resultados:', resultados);
        // Envía la respuesta con los resultados si es necesario
        res.json({ resultados });
    } catch (error) {
        console.error('Ocurrió un error:', error);
        res.status(500).json({ error: 'Ocurrió un error al ejecutar las funciones' });
    }
}




