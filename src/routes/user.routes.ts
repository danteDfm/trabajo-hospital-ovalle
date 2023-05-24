import { Router } from "express";
const router = Router();
import { UsuarioController } from "../controllers/usuario.controller";

router.post('/guardar', UsuarioController.crearUsuario);
router.get('/listar', UsuarioController.listaUsuarios);
router.post('/actualizar/:idUsuario', UsuarioController.actualizarUsuario);

export default router;
