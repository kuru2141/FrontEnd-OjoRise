import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function useAuthStoreRehydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });

    setHydrated(useAuthStore.persist?.hasHydrated ?? true);

    return () => {
      unsub?.();
    };
  }, []);

  return hydrated;
}
