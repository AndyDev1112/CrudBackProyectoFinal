import Joi from 'joi';

// Especificación del esquema para validar el inicio de sesión del usuario

const loginUserSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Validar formato de email
        .required()
        .messages({
            'string.empty': 'El campo email es requerido',
            'string.email': 'El email proporcionado no tiene un formato válido',
            'any.required': 'Falta el campo email en la solicitud'
        }),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp('^[a-zA-Z0-9]+$'))
        .required()
        .messages({
            'string.empty': 'El campo password es requerido',
            'string.min': 'La longitud mínima del password es de 8 caracteres',
            'string.max': 'La longitud máxima del password es de 20 caracteres',
            'string.pattern.base': 'El password solo puede contener letras y números',
            'any.required': 'Falta el campo password en la solicitud'
        })
});

// Especificación del esquema para validar la adición de registros

const addRegistrosSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'any.required': 'El campo ID es requerido',
            'number.base': 'El campo ID debe ser un número'
        }),
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'El campo nombre debe ser una cadena de caracteres',
            'string.empty': 'El campo nombre no puede estar vacío',
            'string.min': 'El campo nombre debe tener al menos {#limit} caracteres',
            'string.max': 'El campo nombre no puede exceder los {#limit} caracteres',
            'any.required': 'El campo nombre es requerido'
        }),
    apellido: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': 'El campo apellido debe ser una cadena de caracteres',
            'string.empty': 'El campo apellido no puede estar vacío',
            'string.min': 'El campo apellido debe tener al menos {#limit} caracteres',
            'string.max': 'El campo apellido no puede exceder los {#limit} caracteres',
            'any.required': 'El campo apellido es requerido'
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'El campo email debe ser una cadena de caracteres',
            'string.empty': 'El campo email no puede estar vacío',
            'string.email': 'El campo email debe tener un formato de correo electrónico válido',
            'any.required': 'El campo email es requerido'
        }),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp('^[a-zA-Z0-9]+$'))
        .required()
        .messages({
            'string.base': 'El campo password debe ser una cadena de caracteres',
            'string.empty': 'El campo password no puede estar vacío',
            'string.min': 'El campo password debe tener al menos {#limit} caracteres',
            'string.max': 'El campo password no puede exceder los {#limit} caracteres',
            'string.pattern.base': 'El campo password solo puede contener letras y números',
            'any.required': 'El campo password es requerido'
        })
});

// Especificación del esquema para validar la actualización de registros

const updateRegistrosSchema = Joi.object({
         id: Joi.number()
         .required()
         .messages({
             'any.required': 'El campo ID es requerido',
             'number.base': 'El campo ID debe ser un número'
         }),
         nombre: Joi.string()
         .min(2)
         .max(50)
         .required()
         .messages({
             'string.base': 'El campo nombre debe ser una cadena de caracteres',
             'string.empty': 'El campo nombre no puede estar vacío',
             'string.min': 'El campo nombre debe tener al menos {#limit} caracteres',
             'string.max': 'El campo nombre no puede exceder los {#limit} caracteres',
             'any.required': 'El campo nombre es requerido'
         }),
         apellido: Joi.string()
         .min(2)
         .max(50)
         .required()
         .messages({
             'string.base': 'El campo apellido debe ser una cadena de caracteres',
             'string.empty': 'El campo apellido no puede estar vacío',
             'string.min': 'El campo apellido debe tener al menos {#limit} caracteres',
             'string.max': 'El campo apellido no puede exceder los {#limit} caracteres',
             'any.required': 'El campo apellido es requerido'
         }),
         email: Joi.string()
         .email({ tlds: { allow: false } })
         .required()
         .messages({
             'string.base': 'El campo email debe ser una cadena de caracteres',
             'string.empty': 'El campo email no puede estar vacío',
             'string.email': 'El campo email debe tener un formato de correo electrónico válido',
             'any.required': 'El campo email es requerido'
         }),
         password: Joi.string()
         .min(8)
         .max(20)
         .pattern(new RegExp('^[a-zA-Z0-9]+$'))
         .required()
         .messages({
             'string.base': 'El campo password debe ser una cadena de caracteres',
             'string.empty': 'El campo password no puede estar vacío',
             'string.min': 'El campo password debe tener al menos {#limit} caracteres',
             'string.max': 'El campo password no puede exceder los {#limit} caracteres',
             'string.pattern.base': 'El campo password solo puede contener letras y números',
             'any.required': 'El campo password es requerido'
         })
     });
    

export { loginUserSchema, addRegistrosSchema, updateRegistrosSchema };




