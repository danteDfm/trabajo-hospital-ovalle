import { Router } from "express";
const router = Router();
import { UsuarioController } from "../controllers/usuario.controller";
import { vericarDataUsuario } from "../middlewares/verificacion.user.middleware";

router.post('/guardar', vericarDataUsuario ,UsuarioController.crearUsuario);
router.get('/listar', UsuarioController.listaUsuarios);
router.post('/actualizar/:idUsuario', UsuarioController.actualizarUsuario);

export default router;
