import { Router } from "express";
import { MainController } from "../controllers/main.controller";
const router = Router();

router.get('/estadisticas', MainController.estadisticas);

export default router;
