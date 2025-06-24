import { create } from "zustand";

interface MyPlanState{
    name: string;
    baseDataGb: string;
    monthlyFee: number;
    voiceCallPrice: string;
    sharingDataGb: string;
    sms: string;
    benefit: string;

    setName: (name: string) => void;
    setBaseDataGb: (baseDataGb: string) => void;
    setMonthlyFee: (monthlyFee: number) => void;
    setVoiceCallPrice: (voiceCallPrice: string) => void;
    setSharingDataGb: (voiceCallPrice: string) => void;
    setSms: (sms: string) => void;
    setBenefit: (benefit: string) => void;
    setMyPlan: (plan: Partial<MyPlanState>) => void;
}

export const useMyPlanStore = create<MyPlanState>((set) => ({
    name: '',
    baseDataGb: '',
    monthlyFee: 0,
    voiceCallPrice: '',
    sharingDataGb: '',
    sms: '',
    benefit: '',

    setName: (name) => set({ name: name ?? '' }),
    setBaseDataGb: (baseDataGb) => set({ baseDataGb: baseDataGb ?? '' }),
    setMonthlyFee: (monthlyFee) => set({ monthlyFee: monthlyFee?? 0 }),
    setVoiceCallPrice: (voiceCallPrice) => set({ voiceCallPrice: voiceCallPrice ?? '' }),
    setSharingDataGb: (sharingDataGb) => set({ sharingDataGb: sharingDataGb ?? '' }),
    setSms: (sms) => set({ sms: sms ?? '' }),
    setBenefit: (benefit) => set({ benefit: benefit ?? '' }),
    setMyPlan: (plan) => set(plan),
}));