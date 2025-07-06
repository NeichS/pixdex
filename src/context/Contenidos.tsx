import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
  ContenidoAudiovisual,
  ContenidoAudiovisualMapped,
} from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { getContenidos, getTipos, getGeneros } from "@/src/services/servicios";

interface PropsProvider {
  children: ReactNode;
}

interface IContextoContenidos {
  getAllContenido: () => ContenidoAudiovisualMapped[];
  getContenidoByTipo: (tipoId: number) => ContenidoAudiovisualMapped[];
  getAllTipos: () => ITipoContenidoAudiovisual[];
  getAllGeneros: () => IGeneroContenidoAudiovisual[];
  getContenidoByID: (id: number) => ContenidoAudiovisualMapped | undefined;
}

export const ContextoContenidos = createContext<IContextoContenidos>({
  /* omito defaults */
} as any);

export default function ContextoContenidosProvider({
  children,
}: PropsProvider) {
  const [contenidos, setContenidos] = useState<ContenidoAudiovisual[]>([]);
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataContenidos, dataTipos, dataGeneros] = await Promise.all([
          getContenidos(),
          getTipos(),
          getGeneros(),
        ]);

        setContenidos(dataContenidos);
        setTipos(dataTipos);
        setGeneros(dataGeneros);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const mapContenido = (
    item: ContenidoAudiovisual
  ): ContenidoAudiovisualMapped => {
    const tipo = tipos.find((t) => t.id === item.tipoId)!;
    const generosMapped = item.generos.map(
      (id) => generos.find((g) => g.id === id)!
    );
    return {
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      tipo,
      generos: generosMapped,
      imageUrl: item.imageUrl,
    };
  };

  const getAllContenido = useMemo(
    () => () => contenidos.map(mapContenido),
    [contenidos, tipos, generos]
  );
  const getContenidoByTipo = (tipoId: number) =>
    contenidos.filter((c) => c.tipoId === tipoId).map(mapContenido);
  const getContenidoByID = (id: number) =>
    contenidos.find((c) => c.id === id)
      ? mapContenido(contenidos.find((c) => c.id === id)!)
      : undefined;
  const getAllTipos = useMemo(() => () => tipos, [tipos]);
  const getAllGeneros = useMemo(() => () => generos, [generos]);

  return (
    <ContextoContenidos.Provider
      value={{
        getAllContenido,
        getContenidoByTipo,
        getAllTipos,
        getAllGeneros,
        getContenidoByID,
      }}
    >
      {children}
    </ContextoContenidos.Provider>
  );
}
