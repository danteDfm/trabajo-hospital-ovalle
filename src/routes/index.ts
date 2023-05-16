import { Application, Router }  from "express";
import routerPaciente from './paciente.routes';
import routerFicha from './ficha.routes';
const router = Router();

export function endPoints(app: Application){

    app.use('/api', router);
    router.use('/paciente', routerPaciente);
    router.use('/ficha', routerFicha);
}

