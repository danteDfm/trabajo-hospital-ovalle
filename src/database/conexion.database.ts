import  mysql, {Pool} from 'mysql2/promise';

class ConexionDatabase {
    
  private poolConexion: Pool| null;

  constructor() {

    this.poolConexion = null;
    this.crearConexion();

  }

    crearConexion(){
    try {
      const pool= mysql.createPool({

        host: 'localhost',
        database: 'DB_SEGUIMIENTO_DE_TRANSITION',
        user: 'root',
        password: 'dante569',

      });

      this.poolConexion =  pool;

    } catch (err) {
      console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
    }
  }

   getConnection(){

    if (!this.poolConexion) {
      throw new Error('LA CONEXION AUN NO SE HA ESTABLECIDO');
    }
    return this.poolConexion;
  }

   async closeConnection(): Promise<void>{
    if (this.poolConexion) {
      await this.poolConexion.end();
      this.poolConexion = null;

    }
  }
}

export default ConexionDatabase;

