import { Application, Router }  from "express";
import routerFicha from './clinica.routes';
const router = Router();

export function endPoints(app: Application){

    app.use('/api', router);
    router.use('/enfermedades', routerFicha);

}

