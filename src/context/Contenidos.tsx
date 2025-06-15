import { createContext, ReactNode, useMemo, useState } from "react";
import {
  ContenidoAudiovisual,
  ContenidoAudiovisualMapped,
} from "@/src/data/contenidosAudiovisuales";
import {
  getTipoPorId,
  ITipoContenidoAudiovisual,
  tiposContenidoAudiovisual,
} from "@/src/data/tiposContenidoAudiovisual";
import {
  generosContenidoAudiovisual,
  getGeneroPorId,
  IGeneroContenidoAudiovisual,
} from "@/src/data/generosContenidoAudiovisual";
import { contenidosAudiovisuales as rawData } from "@/src/data/contenidosAudiovisuales";

interface PropsProvider {
  children: ReactNode;
}

interface IContextoContenidos {
  contenidos: ContenidoAudiovisual[]; //medio al pedo esto me parece
  mapContenido: (item: ContenidoAudiovisual) => ContenidoAudiovisualMapped;
  getAllContenido: () => ContenidoAudiovisualMapped[];
  getContenidoByTipo: (tipoId: number) => ContenidoAudiovisualMapped[];
  getAllTipos: () => ITipoContenidoAudiovisual[];
  getAllGeneros: () => IGeneroContenidoAudiovisual[];
  getContenidoByID: (id: number) => ContenidoAudiovisualMapped | undefined;
}

// valores por defecto del contexto
export const ContextoContenidos = createContext<IContextoContenidos>({
  contenidos: [],
  mapContenido: () => {
    throw new Error("ContextoContenidos: mapContenido no está inicializado");
  },
  getAllContenido: () => {
    throw new Error("ContextoContenidos: getAllContenido no está inicializado");
  },
  getContenidoByTipo: () => {
    throw new Error("ContextoContenidos: getContenidoByTipo no está inicializado");
  },
  getAllTipos: () => {
    throw new Error("ContextoContenidos: getAllTipos no está inicializado");
  },
  getAllGeneros: () => {
    throw new Error("ContextoContenidos: getAllGeneros no está inicializado");
  },
  getContenidoByID: (id: number) => {
    throw new Error("ContextoContenidos: getContenidoByID no está inicializado");
  },
});

export default function ContextoContenidosProvider({ children }: PropsProvider) {
  const [contenidos, setContenidos] = useState<ContenidoAudiovisual[]>(rawData);

  const mapContenido = (
    item: ContenidoAudiovisual
  ): ContenidoAudiovisualMapped => {
    const tipo: ITipoContenidoAudiovisual = getTipoPorId(item.tipoId);
    const generosMapped: IGeneroContenidoAudiovisual[] = item.generos.map(
      (id) => getGeneroPorId(id)
    );

    return {
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      generos: generosMapped,
      tipo: tipo,
      imageUrl: item.imageUrl,
    };
  };

  const getAllContenido = useMemo((): (() => ContenidoAudiovisualMapped[]) => {
    return () => contenidos.map((c) => mapContenido(c));
  }, [contenidos]);

  const getContenidoByTipo = (tipoId: number): ContenidoAudiovisualMapped[] => {
    const filtrados = contenidos.filter((c) => c.tipoId === tipoId);
    return filtrados.map((c) => mapContenido(c));
  };

  const getAllTipos = useMemo((): (() => ITipoContenidoAudiovisual[]) => {
    return () => tiposContenidoAudiovisual;
  }, [tiposContenidoAudiovisual]);

  const getAllGeneros = useMemo((): (() => IGeneroContenidoAudiovisual[]) => {
    return () => generosContenidoAudiovisual
  }, [contenidos]);

  const getContenidoByID = (id: number): ContenidoAudiovisualMapped | undefined => {
    const contenido = contenidos.find((c) => c.id === id);
    return contenido ? mapContenido(contenido) : undefined;
  };

  //  único value que se pasa al Provider
  const valueContexto: IContextoContenidos = {
    contenidos,
    mapContenido,
    getAllContenido,
    getContenidoByTipo,
    getAllTipos,
    getAllGeneros,
    getContenidoByID
  };

  return (
    <ContextoContenidos.Provider value={valueContexto}>
      {children}
    </ContextoContenidos.Provider>
  );
}
