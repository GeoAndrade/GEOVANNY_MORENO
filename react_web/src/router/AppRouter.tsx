import { useLocation } from "react-router-dom";
import { AuthRouter } from "../auth/router";
import { useLocalStorage } from "../data";
import { useMemo } from "react";

export const AppRouter = () => {
  const { SaveLastPath } = useLocalStorage();
  const { pathname, search } = useLocation();
  useMemo(
    async () => await SaveLastPath(pathname + search),
    [pathname, search, SaveLastPath]
  );
  return <AuthRouter />;
};
