import { Router } from "express";
const router = Router();
import { TableController } from "../controllers/crearData/dataTable.controller";

router.get('/mostrar', TableController.mostrarPaciente);

export default router;
