import { Router } from "express";
const router = Router();
import { crearEnfermedades } from "../controllers/clinica.controller";

router.post('/', crearEnfermedades);


export default router;