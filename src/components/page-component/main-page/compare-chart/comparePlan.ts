import { useMyPlanStore } from "@/stores/myPlanStore";
import { usePlanStore } from "@/stores/usePlanStore";
import { ComparePlan, Plan } from "@/types/plan";

const toComparePlan = (plan: Plan): ComparePlan => {
    return {
      name: plan.name,
      baseDataGb: plan.baseDataGb,
      monthlyFee: plan.monthlyFee,
      voiceCallPrice: plan.voiceCallPrice,
      sharingDataGb: plan.sharingDataGb,
      sms: plan.sms,
      benefit: plan.benefit,
    };
  }

export const getBaseAndCompareItem = () => {
  const defaultPlan:ComparePlan = {name: '', monthlyFee: 0, baseDataGb: '', voiceCallPrice: '', sharingDataGb: '', sms: '', benefit: ''}
  const isCompareWithMine = usePlanStore(state => state.isCompareWithMine);
  const selectedPlans = usePlanStore(state => state.selectedPlans);
  const {name, baseDataGb, monthlyFee, voiceCallPrice, sharingDataGb, sms, benefit} = useMyPlanStore();

  const baseItem = isCompareWithMine
  ? { name, baseDataGb, monthlyFee, voiceCallPrice, sharingDataGb, sms, benefit }
  : (selectedPlans[0] ? toComparePlan(selectedPlans[0]) : defaultPlan);
  
  const compareItem = isCompareWithMine
  ? (selectedPlans[0] ? toComparePlan(selectedPlans[0]) : defaultPlan)
  : (selectedPlans[1] ? toComparePlan(selectedPlans[1]) : defaultPlan);

  return {baseItem, compareItem};
}