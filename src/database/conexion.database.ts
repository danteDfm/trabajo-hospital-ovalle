import  mysql, {Pool} from 'mysql2/promise';

class ConexionDatabase {
    
  private poolConexion: Pool| null;

  constructor() {

    this.poolConexion = null;
    this.crearConexion();

  }

  async crearConexion(): Promise<void>{
    try {
      const objDbs = await mysql.createPool({

        host: 'localhost',
        database: 'hospital',
        user: 'root',
        password: 'dante569',

      });

      this.poolConexion =  objDbs;

    } catch (err) {
      console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
    }
  }

  async getConnection(): Promise<Pool>{

    if (!this.poolConexion) {
      throw new Error('LA CONEXION AUN NO SE HA ESTABLECIDO');
    }
    return this.poolConexion;
  }

  async closeConnection(): Promise<void> {
    if (this.poolConexion) {
      await this.poolConexion.end();
      this.poolConexion = null;
    }
  }
}

export default ConexionDatabase;

