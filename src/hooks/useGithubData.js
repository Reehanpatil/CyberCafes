import { useState, useEffect, useCallback, useRef } from "react";
import { fetchContent, updateContent } from "../lib/github";
import fallbackData from "../data/siteData";

export function useGithubData() {
  const [data, setData] = useState(fallbackData);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const hasLoadedOnce = useRef(false);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const result = await fetchContent();
      setData(result.data);
      setSha(result.sha);
      setStatus("ready");
    } catch (e) {
      setError(e.message);
      setStatus("offline");
    } finally {
      if (!hasLoadedOnce.current) {
        hasLoadedOnce.current = true;
        setInitialized(true);
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(
    async (newData) => {
      setStatus("saving");
      try {
        const result = await updateContent(newData, sha);
        setData(newData);
        setSha(result.sha);
        setStatus("ready");
        return { ok: true };
      } catch (e) {
        setError(e.message);
        setStatus("error");
        return { ok: false, error: e.message };
      }
    },
    [sha],
  );

  return { data, status, error, save, reload: load, initialized };
}
