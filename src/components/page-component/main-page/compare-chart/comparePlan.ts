import { useMyPlanStore } from "@/stores/myPlanStore";
import { usePlanStore } from "@/stores/usePlanStore";
import { ComparePlan, Plan } from "@/types/plan";
import { useMemo } from "react";

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
};

const defaultPlan: ComparePlan = {
  name: "",
  monthlyFee: 0,
  baseDataGb: "",
  voiceCallPrice: "",
  sharingDataGb: "",
  sms: "",
  benefit: "",
};

export const useBaseAndCompareItem = () => {
  const isCompareWithMine = usePlanStore((state) => state.isCompareWithMine);
  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  const { name, baseDataGb, monthlyFee, voiceCallPrice, sharingDataGb, sms, benefit } =
    useMyPlanStore();

  const baseItem = useMemo(
    () =>
      isCompareWithMine
        ? { name, baseDataGb, monthlyFee, voiceCallPrice, sharingDataGb, sms, benefit }
        : selectedPlans[0]
        ? toComparePlan(selectedPlans[0])
        : defaultPlan,
    [baseDataGb, benefit, isCompareWithMine, monthlyFee, name, selectedPlans, sharingDataGb, sms, voiceCallPrice]
  );

  const compareItem = isCompareWithMine
    ? selectedPlans[0]
      ? toComparePlan(selectedPlans[0])
      : defaultPlan
    : selectedPlans[1]
    ? toComparePlan(selectedPlans[1])
    : defaultPlan;

  return { baseItem, compareItem };
};