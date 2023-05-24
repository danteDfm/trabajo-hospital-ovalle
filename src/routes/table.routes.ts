import { Router } from "express";
const router = Router();
import { TableController } from "../controllers/dataTable.controller";

router.get('/dataTable', TableController.tablePacientes);
router.get('/dataTable/diferente', TableController.tableCentrosDiferente);
router.get('/dataFicha/:idFicha', TableController.mostrarFicha);

export default router;
