type PlanSource = "recommend" | "like";

export interface comparePlan{
  name: string;
  baseDataGb: string;
  monthlyFee: number;
  voiceCallPrice: string;
  sms: string;
  benefit: string;
}

export interface Plan extends comparePlan{
  planId: number;
  description: string;
  mobileType: string;
  onRemove?: () => void;
  source?: PlanSource;
}

export interface MyPlan extends comparePlan{
  planId: number;
  dailyDataGb: string,
  sharingDataGb: string,
  throttleSpeedKbps: 0,
  eligibility: "ALL" | "YOUTH" | "OLD" | "SOLDIER" | "BOY" | "KID",
  mobileType: string,
  planUrl: string,
  telecomProvider: "KT" | "SKT" | "LG",
  description: string,
  isOnline: boolean
}

export interface ApiPlan {
  planId: number;
  name: string;
}

export interface guestPlan{
  planName: string;
  telecomProvider: string;
}