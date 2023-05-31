import bcrypt from 'bcryptjs';

export async function hashContrasena(contrasena: string): Promise<string>{

    let salt = await bcrypt.genSalt(10);
    let hash: string = await bcrypt.hash(contrasena, salt);

    console.log(hash);
    return hash;
}

export async function compararContrasena(contrasenaRecibida:string, contrasenaDbs:string): Promise<boolean>{

    let comparacion:boolean = await bcrypt.compare(contrasenaRecibida, contrasenaDbs);
    return comparacion;
}