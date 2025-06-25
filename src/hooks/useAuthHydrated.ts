import { useEffect, useState } from "react";
import { usePlanStore } from "@/stores/usePlanStore";
import { useAuthStore } from "@/stores/authStore";

export function useAuthHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.onFinishHydration(() => {
      setHydrated(true); // persist가 완료되면 true
    });

    // 혹시 hydration이 이미 끝난 상태라면 바로 true로 설정
    if (usePlanStore.persist.hasHydrated?.()) {
      setHydrated(true);
    }

    return unsub;
  }, []);

  return hydrated;
}
