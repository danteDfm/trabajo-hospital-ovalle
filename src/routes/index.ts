import { Application, Router }  from "express";

import routerFormulario from './formulario.routes';
import tablarouter from './table.routes';
import routerMain from './main.routes';
import routerUsuario from './user.routes';
import routerSesion from './sesion.routes';
import routerApiFonasa from './apiCesfam.routes';
import routerFicha from './fichas.routes';

const router = Router();

export function endPoints(app: Application){

    app.use('/api/v1', router);
    router.use('/form', routerFormulario);
    router.use('/tabla', tablarouter);
    router.use('/fichas', routerFicha);

    router.use('/main', routerMain);
    router.use('/usuario', routerUsuario);
    router.use('/sesion', routerSesion);
    router.use('/fonasa', routerApiFonasa);
}

