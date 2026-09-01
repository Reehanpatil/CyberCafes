import { createContext, useContext } from "react";
import { useGithubData } from "../hooks/useGithubData";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const value = useGithubData();
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSiteData must be used inside <DataProvider>");
  return ctx;
}
