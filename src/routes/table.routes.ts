import { TablaController } from "../controllers/tabla.controller";
import { Router } from "express";
const router = Router();


router.get('/listar', TablaController.listarPaciente);


export default router;
