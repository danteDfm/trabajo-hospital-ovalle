import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/crearData/formulario.controller";

router.post('/crear/:idUsuario', FormularioController.crearFormulario);

export default router;
