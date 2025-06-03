import {
  ContenidoAudiovisual,
  ContenidoAudiovisualMapped,
  contenidosAudiovisuales,
} from "@/src/data/contenidosAudiovisuales";
import {
  getGeneroPorId,
  IGeneroContenidoAudiovisual,
} from "@/src/data/generosContenidoAudiovisual";
import {
  getTipoPorId,
  ITipoContenidoAudiovisual,
  tiposContenidoAudiovisual,
} from "@/src/data/tiposContenidoAudiovisual";
import { View, StyleSheet } from "react-native";
import { Generos } from "./Generos";

export function Contenido() {
  return (
    <View style={styles.container}>
      {tiposContenidoAudiovisual.map((tipo) => {
        const contenido: ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(
          contenidosAudiovisuales.filter((c) => c.tipoId === tipo.id)
        );

        return (
          <Generos
            key={tipo.id}
            lista={contenido}
            generoTitulo={tipo.plural.toUpperCase()}
          />
        );
      })}
    </View>
  );
}

function mapContenidoAudiovisual(
  contenido: ContenidoAudiovisual[]
): ContenidoAudiovisualMapped[] {
  const contenidoAudiovisualMapeado: ContenidoAudiovisualMapped[] =
    contenido.map((contenido) => {
      const tipo: ITipoContenidoAudiovisual = getTipoPorId(contenido.tipoId);
      let temp: IGeneroContenidoAudiovisual[] = [];
      contenido.generos.forEach((generoId) => {
        temp.push(getGeneroPorId(generoId));
      });
      const generos: IGeneroContenidoAudiovisual[] = temp;

      return {
        id: contenido.id,
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        generos: generos,
        tipo: tipo,
        imageUrl: contenido.imageUrl,
      } as ContenidoAudiovisualMapped;
    });

  return contenidoAudiovisualMapeado;
}


const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});