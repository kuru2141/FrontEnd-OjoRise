import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurveyStore } from "@/stores/surveyStore";

export function FamilyBundleGroup() {
  const { data, setField } = useSurveyStore();
  
  return (
    <RadioGroup
      value={data.familyBundle}
      onValueChange={(value) => setField("familyBundle", value)}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="yes" id="r1" />
        <Label htmlFor="r1" className="text-[18px]">
          할 예정이에요
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="no" id="r2" />
        <Label htmlFor="r2" className="text-[18px]">
          안 할 예정이에요
        </Label>
      </div>
    </RadioGroup>
  );
}
