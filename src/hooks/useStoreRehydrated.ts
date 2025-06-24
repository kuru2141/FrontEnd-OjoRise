import { useEffect, useState } from "react";
import { usePlanStore } from "@/stores/usePlanStore";

export function usePlanStoreRehydrated(): boolean {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const unsub = usePlanStore.persist.onFinishHydration(() => {
      setRehydrated(true); // persist가 완료되면 true
    });

    // 혹시 hydration이 이미 끝난 상태라면 바로 true로 설정
    if (usePlanStore.persist.hasHydrated?.()) {
      setRehydrated(true);
    }

    return unsub;
  }, []);

  return rehydrated;
}
