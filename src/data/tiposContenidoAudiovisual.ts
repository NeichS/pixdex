export interface ITipoContenidoAudiovisual {
  id: number;
  singular: string;
  plural: string;
}

export const tiposContenidoAudiovisual: ITipoContenidoAudiovisual[] = [
  { id: 1, singular: "serie", plural: "series" },
  { id: 2, singular: "película", plural: "películas" },
  { id: 3, singular: "anime", plural: "animes" },
];

/**
 * Busca un tipo por su id y lo retorna. En caso de no encontrarlo, retorna un tipo con el id consultado y nombre "-"
 * @param id number
 * @returns ITipoContenidoAudiovisual
 */
export function getTipoPorId(id: number): ITipoContenidoAudiovisual {
  const fallback = { id: id, singular: "-", plural: "-" };
  return (
    tiposContenidoAudiovisual.find((contenido) => contenido.id === id) ??
    fallback
  );
}