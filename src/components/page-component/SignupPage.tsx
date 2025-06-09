import { SelectCarrier } from "../common/SelectCarrier";
import VerticalLinearStepper from "../common/VerticalLinearStepper";
import { PlanCombo } from "../common/PlanCombo";
import { DateInput } from "../ui/date-input";
import { ContractRadioGroup } from "../common/ContractRadioGroup";
import { FamilyPlanRadioGroup } from "../common/FamilyPlanRadioGroup";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <VerticalLinearStepper />
        <DateInput />
        <SelectCarrier/>
        <PlanCombo />
        <ContractRadioGroup />
        <FamilyPlanRadioGroup/>
      </div>
    </div>
  );
}
