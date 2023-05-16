import { Router } from "express";
const router = Router();
import { PacienteController } from "../controllers/paciente.controller";


router.post('/crear', PacienteController.crearPaciente);
router.get('/listar', PacienteController.dataPaciente);


export default router;