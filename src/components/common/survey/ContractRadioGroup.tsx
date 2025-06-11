import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurveyStore } from "@/stores/surveyStore";

export function ContractRadioGroup() {
  const { data, setField } = useSurveyStore();
  return (
    <RadioGroup
      value={data.contractTerm}
      onValueChange={(value) => setField("contractTerm", value)}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="no_contract" id="r1" />
        <Label htmlFor="r1" className="text-[18px]">
          약정이 없어요.
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_3_months" id="r2" />
        <Label htmlFor="r2" className="text-[18px]">
          3개월 이내
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_6_months" id="r3" />
        <Label htmlFor="r3" className="text-[18px]">
          6개월 이내
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="within_1_year" id="r4" />
        <Label htmlFor="r4" className="text-[18px]">
          1년 이내
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="over_1_year" id="r5" />
        <Label htmlFor="r5" className="text-[18px]">
          1년 이상
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="unknown" id="r6" />
        <Label htmlFor="r6" className="text-[18px]">
          모르겠어요.
        </Label>
      </div>
    </RadioGroup>
  );
}
