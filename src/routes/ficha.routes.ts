import { Router } from "express";
const router = Router();
import { FichaController } from "../controllers/ficha.controller";

router.post(
  "/crear/:idUsuario",
  FichaController.crearDetallesPaciente,
  FichaController.crearDetallesFicha,
  FichaController.crearFicha
);
router.get('/mostrar/:rutPaciente', FichaController.fichaPaciente);
export default router;
