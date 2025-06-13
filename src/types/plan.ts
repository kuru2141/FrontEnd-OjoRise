export interface Plan {
  name: string;
  baseDataGb: string;
  monthlyFee: number;
  voiceCallPrice: string;
  sms: string;
  description: string;
  mobileType: string;
  onRemove?: () => void;
}

export interface MyPlan {
  id: string;
  name: string;
  price: string;
  call: string;
  sms: string;
  tech: string;
  data: string;
  speed: string;
  extraCall: string;
  numberChangeFee: string;
}
