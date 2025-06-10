export interface Plan {
  label: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  onRemove?: () => void;
}
