import { Router } from "express";
const router = Router();
import { FichaController } from "../controllers/ficha.controller";

router.post('/crear/:idPaciente', FichaController.crearFicha);


export default router;