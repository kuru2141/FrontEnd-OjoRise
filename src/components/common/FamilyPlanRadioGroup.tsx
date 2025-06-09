import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FamilyPlanRadioGroup() {
  return (
    <RadioGroup defaultValue="no_contract">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="no_family_bundle" id="r1" />
        <Label htmlFor="r1" className="text-[18px]">
          결합이 없어요.
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="currently_bundled" id="r2" />
        <Label htmlFor="r2" className="text-[18px]">
          가족 결합을 하고 있어요.
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="planning_to_bundle" id="r3" />
        <Label htmlFor="r3" className="text-[18px]">
          가족 결합을 할 예정이에요.
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="unknown" id="r4" />
        <Label htmlFor="r4" className="text-[18px]">
          모르겠어요.
        </Label>
      </div>
    </RadioGroup>
  );
}
