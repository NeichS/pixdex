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
  clearTypeFilter: () => void;
  clearGenreFilter: () => void;
  getContenidoFiltered: () => void;
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
  clearTypeFilter: () => {
    throw new Error("ContextoFilter: clearTypeFilter no está inicializado");
  },
  clearGenreFilter: () => {
    throw new Error("ContextoFilter: clearGenreFilter no está inicializado");
  },
  getContenidoFiltered: () => {
    throw new Error("ContextoFilter: getContenidoFIltered no está inicializado");
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
    console.log(typeFilter);
  };

  const removeTypeFilter = (typeID: number) => {
    setGenreFilter((prev) => prev.filter((id) => id !== typeID));
    // filter() devuelve un nuevo array sin los elementos que no pasen el test :contentReference[oaicite:1]{index=1}
    console.log(typeFilter);
  };

  const getGenreFilter = () => {
    return genreFilter;
  };

  const addGenreFilter = (genreID: number) => {
    setGenreFilter((prev) => [...prev, genreID]);
    console.log(genreFilter);
  };

  const removeGenreFilter = (genreID: number) => {
    setGenreFilter((prev) => prev.filter((id) => id !== genreID));
    console.log(genreFilter);
  };

  const clearGenreFilter = () => {
    setGenreFilter([]);
  };

  const clearTypeFilter = () => {
    setTypeFilter([]);
  };

  const getContenidoFiltered = () => {
    // Aquí deberías implementar la lógica para filtrar los contenidos
  }
  const valueContexto: IContextoFilter = {
    addTypeFilter,
    removeTypeFilter,
    addGenreFilter,
    removeGenreFilter,
    getTypeFilter,
    getGenreFilter,
    clearGenreFilter,
    clearTypeFilter,
    getContenidoFiltered,
  };

  return (
    <ContextoFilter.Provider value={valueContexto}>
      {children}
    </ContextoFilter.Provider>
  );
}
