import { useEffect, useState } from "react";

/**
 * UseFetch is a custom hook that fetches data from an API and returns the data, a boolean for loading,
 * and a boolean for error.
 * @returns An object with three properties: data, isLoading, and error.
 */
export function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(url);
        const dataHome = await response.json();
        setData((current) => (current = dataHome));
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return { data, isLoading, error };
}
