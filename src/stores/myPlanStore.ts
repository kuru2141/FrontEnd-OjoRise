import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyPlanState {
  name: string;
  baseDataGb: string;
  monthlyFee: number;
  voiceCallPrice: string;
  sharingDataGb: string;
  sms: string;
  benefit: string;
  telecom: string;
  throttleSpeedKbps: number;
  eligibility: string;
  setName: (name: string) => void;
  setBaseDataGb: (baseDataGb: string) => void;
  setMonthlyFee: (monthlyFee: number) => void;
  setVoiceCallPrice: (voiceCallPrice: string) => void;
  setSharingDataGb: (sharingDataGb: string) => void;
  setSms: (sms: string) => void;
  setBenefit: (benefit: string) => void;
  setTelecom: (telecom: string) => void;
  setMyPlan: (plan: Partial<MyPlanState>) => void;
}

export const useMyPlanStore = create<MyPlanState>()(
  persist(
    (set) => ({
      name: "",
      baseDataGb: "",
      monthlyFee: 0,
      voiceCallPrice: "",
      sharingDataGb: "",
      sms: "",
      benefit: "",
      telecom: "",
      throttleSpeedKbps: 0,
      eligibility: "",
      setName: (name) => set({ name: name ?? "" }),
      setBaseDataGb: (baseDataGb) => set({ baseDataGb: baseDataGb ?? "" }),
      setMonthlyFee: (monthlyFee) => set({ monthlyFee: monthlyFee ?? 0 }),
      setVoiceCallPrice: (voiceCallPrice) => set({ voiceCallPrice: voiceCallPrice ?? "" }),
      setSharingDataGb: (sharingDataGb) => set({ sharingDataGb: sharingDataGb ?? "" }),
      setSms: (sms) => set({ sms: sms ?? "" }),
      setBenefit: (benefit) => set({ benefit: benefit ?? "" }),
      setTelecom: (telecom) => set({ telecom: telecom ?? "" }),
      setMyPlan: (plan) => set(plan),
    }),
    {
      name: "my-plan-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
