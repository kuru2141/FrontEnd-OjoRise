import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ContractRadioGroup() {
  return (
    <RadioGroup defaultValue="no_contract">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="no_contract" id="r1" />
        <Label htmlFor="r1">약정이 없어요.</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_3_months" id="r2" />
        <Label htmlFor="r2">3개월 이내</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_6_months" id="r3" />
        <Label htmlFor="r3">6개월 이내</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_1_year" id="r4" />
        <Label htmlFor="r4">1년 이내</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="over_1_year" id="r5" />
        <Label htmlFor="r5">1년 이상</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="unknown" id="r6" />
        <Label htmlFor="r6">모르겠어요.</Label>
      </div>
    </RadioGroup>
  );
}
