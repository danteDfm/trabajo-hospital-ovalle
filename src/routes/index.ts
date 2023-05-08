import { Application, Router }  from "express";
import routerEditarVista from './vista.data.paciente.routes';
import routerFicha from './ficha.tecnica.routes';
const router = Router();

export function endPoints(app: Application){

    app.use('/api', router);
    router.use('/enfermedades', routerFicha);
    router.use('/vista-editar', routerEditarVista);

}

