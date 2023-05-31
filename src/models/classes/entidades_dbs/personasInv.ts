import { InterfacePersonasInv } from "../../interfaces/tipos.entidades";

export class Involucrado implements InterfacePersonasInv {
  public rutInvolucrado: string | null;
  public nombreInvolucrado: string | null;
  public apellidoPInvolucrado: string | null;
  public apellidoMInvolucrado: string | null;
  public parentescoInvolucrado: string | null;
  public telefonoInvolucrado: string | null;
  public domicilioInvolucrado: string | null;

  constructor(involucrado: InterfacePersonasInv) {
    this.rutInvolucrado = involucrado.rutInvolucrado
      ? involucrado.rutInvolucrado
      : null;
    this.nombreInvolucrado = involucrado.nombreInvolucrado
      ? involucrado.nombreInvolucrado
      : null;
    this.apellidoPInvolucrado = involucrado.apellidoPInvolucrado
      ? involucrado.apellidoPInvolucrado
      : null;
    this.apellidoMInvolucrado = involucrado.apellidoMInvolucrado
      ? involucrado.apellidoMInvolucrado
      : null;
    this.parentescoInvolucrado = involucrado.parentescoInvolucrado
      ? involucrado.parentescoInvolucrado
      : null;
    this.telefonoInvolucrado = involucrado.telefonoInvolucrado
      ? involucrado.telefonoInvolucrado
      : null;
    this.domicilioInvolucrado = involucrado.domicilioInvolucrado
      ? involucrado.domicilioInvolucrado
      : null;
  }
}
