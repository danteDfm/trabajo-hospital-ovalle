import { Router, Request, Response } from "express";
const router = Router();
import { CrearFichaTecnica } from "../controllers/ficha.controller";

router.post('/', CrearFichaTecnica.crearFicha);


export default router;