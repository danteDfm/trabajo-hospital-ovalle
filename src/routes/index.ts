import { Application, Router }  from "express";

import routerFormulario from './formulario.routes';
import routerTable from './table.routes';
const router = Router();

export function endPoints(app: Application){

    app.use('/api', router);

    router.use('/form', routerFormulario);
    router.use('/table', routerTable);
}

