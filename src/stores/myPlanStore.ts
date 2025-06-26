import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyPlan {
  name: string;
  baseDataGb: string;
  monthlyFee: number;
  voiceCallPrice: string;
  sharingDataGb: string;
  sms: string;
  benefit: string;
  telecomProvider: string;
  throttleSpeedKbps: number;
  eligibility: string;
  mobileType: string;
}

interface MyPlanState extends MyPlan {
  setName: (name: string) => void;
  setBaseDataGb: (baseDataGb: string) => void;
  setMonthlyFee: (monthlyFee: number) => void;
  setVoiceCallPrice: (voiceCallPrice: string) => void;
  setSharingDataGb: (sharingDataGb: string) => void;
  setSms: (sms: string) => void;
  setBenefit: (benefit: string) => void;
  setTelecomProvider: (telecom: string) => void;
  setMyPlan: (plan: Partial<MyPlanState>) => void;
  setPlanReset: () => void;
}

const initialState: MyPlan = {
  name: "",
  baseDataGb: "",
  monthlyFee: 0,
  voiceCallPrice: "",
  sharingDataGb: "",
  sms: "",
  benefit: "",
  telecomProvider: "LG",
  throttleSpeedKbps: 0,
  eligibility: "",
  mobileType: "",
};

export const useMyPlanStore = create<MyPlanState>()(
  persist(
    (set) => ({
      ...initialState,
      setName: (name) => set({ name: name ?? "" }),
      setBaseDataGb: (baseDataGb) => set({ baseDataGb: baseDataGb ?? "" }),
      setMonthlyFee: (monthlyFee) => set({ monthlyFee: monthlyFee ?? 0 }),
      setVoiceCallPrice: (voiceCallPrice) => set({ voiceCallPrice: voiceCallPrice ?? "" }),
      setSharingDataGb: (sharingDataGb) => set({ sharingDataGb: sharingDataGb ?? "" }),
      setSms: (sms) => set({ sms: sms ?? "" }),
      setBenefit: (benefit) => set({ benefit: benefit ?? "" }),
      setTelecomProvider: (telecom) => set({ telecomProvider: telecom ?? "" }),
      setMyPlan: (plan) => set(plan),
      setPlanReset: () => set(initialState),
    }),
    {
      name: "my-plan-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
