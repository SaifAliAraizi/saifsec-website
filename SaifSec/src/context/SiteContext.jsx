import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../api/apiClient";

const SiteContext = createContext({ site: null, loading: true, error: null });

export function SiteProvider({ children }) {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    apiRequest("/site/")
      .then((d) => { if (active) setSite(d); })
      .catch((e) => { if (active) setError(e); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return <SiteContext.Provider value={{ site, loading, error }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}