import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../api/apiClient";

function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(endpoint));
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => {
    setRequestKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!endpoint) {
      setData(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const responseData = await apiRequest(endpoint, {
          method: "GET",
          signal: controller.signal,
        });

        setData(responseData);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, [endpoint, requestKey]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export default useApiData;