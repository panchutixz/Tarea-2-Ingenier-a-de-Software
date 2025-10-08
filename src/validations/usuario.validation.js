"use strict";
import Joi from "joi";

// Función para validar que el correo electrónico termine en @gmail.com o @gmail.cl
const domainEmailValidator = (value, helpers) => {
  if (!value.endsWith("@gmail.com") && !value.endsWith("@gmail.cl")) {
    return helpers.message(
      "El correo electrónico debe finalizar en @gmail.com o @gmail.cl."
    );
  }
  return value;
};

// Esquema de validación para el registro de usuarios
export const registerValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .min(15)
    .max(50)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico no puede exceder los 50 caracteres.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string()
    .min(8)
    .max(26)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

// Esquema de validación para el inicio de sesión
export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string().min(8).max(26).required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "string.max": "La contraseña debe tener como máximo 26 caracteres.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });