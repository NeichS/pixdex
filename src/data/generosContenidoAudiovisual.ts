export interface IGeneroContenidoAudiovisual {
  id: number;
  nombre: string;
}

export const generosContenidoAudiovisual: IGeneroContenidoAudiovisual[] = [
  { id: 1, nombre: "drama" },
  { id: 2, nombre: "comedia" },
  { id: 3, nombre: "acción" },
  { id: 4, nombre: "ciencia ficción" },
  { id: 5, nombre: "aventura" },
  { id: 6, nombre: "fantasía" },
  { id: 7, nombre: "terror" },
  { id: 8, nombre: "misterio" },
  { id: 9, nombre: "romance" },
  { id: 10, nombre: "thriller" },
  { id: 11, nombre: "superhéroes" },
  { id: 12, nombre: "slice of life" },
  { id: 13, nombre: "shonen" },
  { id: 14, nombre: "mecha" },
  { id: 15, nombre: "histórico" },
  { id: 16, nombre: "documental" },
];

/**
 * Busca un genero por su id y lo retorna. En caso de no encontrarlo, retorna un genero con el id consultado y nombre "-"
 * @param id number
 * @returns IGeneroContenidoAudiovisual
 */
export function getGeneroPorId(id: number): IGeneroContenidoAudiovisual {
  const fallback = { id: id, nombre: "-" };
  return (
    generosContenidoAudiovisual.find((genero) => genero.id === id) ?? fallback
  );
}