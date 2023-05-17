import { Router } from "express";
const router = Router();
import { PacienteController } from "../controllers/paciente.controller";

router.get('/listar', PacienteController.dataPaciente);
router.get('/listar-rut', PacienteController.traerXRutController);


export default router;