export interface Plan {
  label: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
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

export interface ApiPlan {
  planId: number;
  name: string;
}