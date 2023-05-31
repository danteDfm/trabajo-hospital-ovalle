import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";

router.post('/crear/:idUsuario', FormularioController.guardarFichaTecnica);

export default router;
