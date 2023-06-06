import { Router } from "express";
const router = Router();
import { Cesfam } from "../controllers/apiCesfam.controller";


router.post('/obtener', Cesfam.api);

export default router;
