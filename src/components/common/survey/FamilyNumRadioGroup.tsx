import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurveyStore } from "@/stores/surveyStore";

export function FamilyNumRadioGroup() {
  const { data, setField } = useSurveyStore();
  return (
    <div>
      <p className="font-bold text-[18px] mb-3 mt-4">몇 대 할 예정인가요?</p>
      <RadioGroup value={data.familyNum} onValueChange={(value) => setField("familyNum", value)}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="2" id="r2" />
          <Label htmlFor="r2" className="text-[18px]">
            2대
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="3" id="r3" />
          <Label htmlFor="r3" className="text-[18px]">
            3대
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="4" id="r4" />
          <Label htmlFor="r4" className="text-[18px]">
            4대 이상
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
