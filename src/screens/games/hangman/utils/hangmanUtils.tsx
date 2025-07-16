import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";

export function generateUnderscores(tituloContenido: string): string[] {
  return tituloContenido.split("").map(c => (c === " " ? " " : "_"));
}

export function getRandomizedContenido(
  contenido: ContenidoAudiovisualMapped[]
): ContenidoAudiovisualMapped {
  
  const randomIndex = Math.floor(Math.random() * contenido.length);
  const randomContenido: ContenidoAudiovisualMapped = contenido[randomIndex];
  console.log("Random Contenido: ", randomContenido);
  return randomContenido;
}

