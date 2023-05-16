import mysql, {Connection} from "mysql2/promise";



class ConexionDatabase {

  sqlConexion:Promise<Connection>;

  constructor() {

      this.crearConexion();
      this.sqlConexion = this.crearConexion();
  }

  crearConexion(){
    try {

      const objSql =mysql.createConnection({

        host: "localhost",
        database: "proyecto_transicion",
        user: "root",
        password: "dante569",

      });

      return objSql;
      
    } catch (err) {

      console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
      throw new Error("LA CONEXION A LA BASE D DATOS SE HA PERDIDO");

    }
  }

  getConnection(){

    if (!this.sqlConexion) {
      throw new Error("LA CONEXION AUN NO SE HA ESTABLECIDO");
    } 
  
    return this.sqlConexion;
  }


  async closeConnection() {
    
    if (this.sqlConexion) {

      (await this.sqlConexion).end();

    }
  }
}

export default ConexionDatabase;
