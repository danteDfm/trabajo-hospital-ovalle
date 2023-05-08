export function generadorConsultas(tabla: string, veces: number): string {
  let queryFormateada: string = "";
  queryFormateada = `INSERT INTO ${tabla.trim()} VALUES(NULL, ${"?,"
    .repeat(veces)
    .slice(0, -1)})`;
  return queryFormateada;
}
