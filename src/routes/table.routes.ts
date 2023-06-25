import { TablaController } from "../controllers/tabla.controller";
import { Router } from "express";
const router = Router();


router.get('/listar/:nombreCentro', TablaController.listarPaciente);    
router.get('/listarCentro/:nombreCentro', TablaController.listarDiferente);


export default router;
