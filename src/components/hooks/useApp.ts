import { createContext, useContext } from "react";
import { SiteProps } from "../../pages/_app";

export const AppContext = createContext({});

export function useAppContext(data: SiteProps) {
  return data;
}

export default function useApp() {
  const app = useContext(AppContext);
  return app;
}
