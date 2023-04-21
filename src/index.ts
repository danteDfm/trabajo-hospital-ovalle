import 'dotenv/config';
import express, {Application} from "express";
import cors from 'cors';
import morgan from 'morgan';
import { endPoints } from './routes';

class Server{

    private app:Application;

    constructor(){

        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();

    }
    settings():void{

        this.app.set('port',process.env.PORT || 3002);
    }
   middlewares():void{

    this.app.use(cors());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());

   }    

   routes(): void{

    endPoints(this.app);
   }

   iniciarServidor(): void{

    this.app.listen(this.app.get('port'), ()=>{

        console.log("SERVER UP PORT "+this.app.get('port'));

    });

   }
}



const objServidor = new Server();
objServidor.iniciarServidor();

