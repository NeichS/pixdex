import { API_URL } from "@/src/common/constants";
import { ContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";

export async function getContenidos(): Promise<ContenidoAudiovisual[]> {
  console.log("LLAMANDO getContenidos a", `${API_URL}/contenidos`);
  const res = await fetch(`${API_URL}/contenidos`);
  console.log("RESPUESTA STATUS", res.status);
  if (!res.ok) {
    console.error("DETAILS:", await res.text());
    throw new Error(`Error ${res.status} al obtener contenidos`);
  }
  const json = await res.json();
  console.log("JSON parseado OK, elementos:", json.length);
  return json;
}

export async function getTipos(): Promise<ITipoContenidoAudiovisual[]> {
  const responseTipos = await fetch(`${API_URL}/tipos`);
  if (!responseTipos.ok) {
    throw new Error("Error al obtener tipos");
  }
  const tipos: ITipoContenidoAudiovisual[] = await responseTipos.json();
  return tipos;
}

export async function getGeneros(): Promise<IGeneroContenidoAudiovisual[]> {
  const responseGeneros = await fetch(`${API_URL}/generos`);
  if (!responseGeneros.ok) {
    throw new Error("Error al obtener generos");
  }
  const generos: IGeneroContenidoAudiovisual[] = await responseGeneros.json();
  return generos;
}

export type ITiposDict = Record<number, ITipoContenidoAudiovisual>;