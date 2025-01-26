import { createContext, ReactNode, FC, useState } from "react";

type FilterContextType = {
  selected: number;
  setSelected: (id: number) => void;
  selectedOrder: number;
  setSelectedOrder: (id: number) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
};

const initialContext: FilterContextType = {
  selected: -1,
  setSelected: () => {},
  selectedOrder: 0,
  setSelectedOrder: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
};

export const FilterContext = createContext<FilterContextType>(initialContext);

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<number>(0);

  const value = {
    selected,
    setSelected,
    selectedOrder,
    setSelectedOrder,
    searchTerm,
    setSearchTerm,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
