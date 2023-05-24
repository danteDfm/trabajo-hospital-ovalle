import { Router } from "express";
import { SessionController } from "../controllers/sesion.controller";
const router = Router();

router.post('/credenciales', SessionController.sesion);

export default router;
