import { Application, Router }  from "express";

import routerFormulario from './formulario.routes';
import routerTable from './table.routes';
import routerMain from './main.routes';
import routerUsuario from './user.routes';
import routerSesion from './sesion.routes';
import routerApiFonasa from './apiCesfam.routes';

const router = Router();

export function endPoints(app: Application){

    app.use('/api/v1', router);

    router.use('/form', routerFormulario);
    router.use('/table', routerTable);
    router.use('/main', routerMain);
    router.use('/usuario', routerUsuario);
    router.use('/sesion', routerSesion);
    router.use('/fonasa', routerApiFonasa);
}

