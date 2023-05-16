export function repetir(veces: number): string {
  const caracter = "?,".repeat(veces).slice(0,-1);
  return caracter;
}
