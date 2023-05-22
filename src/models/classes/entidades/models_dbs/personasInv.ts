import {TypePersonasInv } from "../../../types/tipos.entidades";

export class Involucrados{

    public rutInvolucrada?:string;
    public pasaporte?:string;
    public nombreInvolucrada?:string;
    public apellidoPInvolucrada?:string;
    public apellidoMInvolucrada?:string;
    public parentescoInvolucrada?:string;
    public telefonoInvolucrada?:string;
    public domicilioInvolucrada?:string;

    constructor(involucrado:TypePersonasInv){

        this.rutInvolucrada = involucrado.rutInvolucrada;
        this.pasaporte = involucrado.pasaporte;
        this.nombreInvolucrada = involucrado.nombreInvolucrada;
        this.apellidoPInvolucrada = involucrado.apellidoPInvolucrada;
        this.apellidoMInvolucrada = involucrado.apellidoMInvolucrada;
        this.parentescoInvolucrada =  involucrado.parentescoInvolucrada;
        this.telefonoInvolucrada = involucrado.telefonoInvolucrada;
        this.domicilioInvolucrada = involucrado.domicilioInvolucrada;

    }
    
}