import bcrypt, { hash } from 'bcrypt';

export async function hashContrasena(contrasena: string): Promise<string>{

    let salt= await bcrypt.genSalt(10);
    let hash: string= await bcrypt.hash(contrasena, salt);
    return hash;
}

export async function compararContrasena(contrasenaDbs:string, contrasenaRecibida:string): Promise<boolean>{

    let comparacion:boolean = await bcrypt.compare(contrasenaDbs, contrasenaRecibida);
    return comparacion;
}