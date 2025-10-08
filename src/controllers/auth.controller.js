import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { registerValidation, loginValidation } from "../validations/usuario.validation.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

export async function login(req, res) {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, error.details[0].message);
    }

    const { email, password } = req.body;
    const data = await loginUser(email, password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 401, error.message);
  }
}

export async function register(req, res) {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, error.details[0].message);
    }

    const newUser = await createUser(req.body);
    delete newUser.password;
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') {
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}