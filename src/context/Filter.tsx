import { ReactNode, createContext, useState } from "react";

interface PropsProvider {
  children: ReactNode;
}

interface IContextoFilter {
  addTypeFilter: (typeID: number) => void;
  addGenreFilter: (genreID: number) => void;
  removeTypeFilter: (typeID: number) => void;
  removeGenreFilter: (genreID: number) => void;
  getTypeFilter: () => number[];
  getGenreFilter: () => number[];
}

export const ContextoFilter = createContext<IContextoFilter>({
  getGenreFilter: () => {
    throw new Error("ContextoFilter: getGenreFilter no está inicializado");
  },
  getTypeFilter: () => {
    throw new Error("ContextoFilter: getTypeFilter no está inicializado");
  },
  addTypeFilter: () => {
    throw new Error("ContextoFilter: addTypeFilter no está inicializado");
  },
  removeTypeFilter: () => {
    throw new Error("ContextoFilter: removeTypeFilter no está inicializado");
  },
  addGenreFilter: () => {
    throw new Error("ContextoFilter: addGenreFilter no está inicializado");
  },
  removeGenreFilter: () => {
    throw new Error("ContextoFilter: removeGenreFilter no está inicializado");
  },
});

export default function ContextoFilterProvider({ children }: PropsProvider) {
  const [typeFilter, setTypeFilter] = useState<number[]>([]);
  const [genreFilter, setGenreFilter] = useState<number[]>([]);

  const getTypeFilter = () => {
    return typeFilter;
  };

  const addTypeFilter = (typeID: number) => {
    setTypeFilter((prev) => [...prev, typeID]);
  };

  const removeTypeFilter = (typeID: number) => {
    setGenreFilter((prev) => prev.filter((id) => id !== typeID));
    // filter() devuelve un nuevo array sin los elementos que no pasen el test :contentReference[oaicite:1]{index=1}
  };

  const getGenreFilter = () => {
    return genreFilter;
  };

  const addGenreFilter = (genreID: number) => {
    setGenreFilter((prev) => [...prev, genreID]);
    // Crea un nuevo array copiando el anterior y añadiendo genreID al final :contentReference[oaicite:0]{index=0}
  };

  const removeGenreFilter = (genreID: number) => {
    setGenreFilter((prev) => prev.filter((id) => id !== genreID));
    // filter() devuelve un nuevo array sin los elementos que no pasen el test :contentReference[oaicite:1]{index=1}
  };

  const valueContexto: IContextoFilter = {
    addTypeFilter,
    removeTypeFilter,
    addGenreFilter,
    removeGenreFilter,
    getTypeFilter,
    getGenreFilter,
  };

  return (
    <ContextoFilter.Provider value={valueContexto}>
      {children}
    </ContextoFilter.Provider>
  );
}
