import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";

router.post('/crear/:idUsuario', FormularioController.crearFormulario);
router.get('/listar/:rutPaciente', FormularioController.mostrarPacienteController);

export default router;
