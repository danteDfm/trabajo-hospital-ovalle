import { Application, Router }  from "express";
import routerPaciente from './paciente.routes';
import routerFicha from './ficha.routes';
import routerForm from './formulario.routes';
import routFormulario from './form.routes';
const router = Router();

export function endPoints(app: Application){

    app.use('/api', router);
    router.use('/paciente', routerPaciente);
    router.use('/ficha', routerFicha);
    router.use('/formulario', routerForm);
    router.use('/form', routFormulario);
}

