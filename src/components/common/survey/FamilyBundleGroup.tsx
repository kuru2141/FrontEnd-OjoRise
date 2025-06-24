import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurveyStore } from "@/stores/surveyStore";
import { isTypeof } from "@/utils/requestHelper";

export function FamilyBundleGroup() {
  const { data, setField } = useSurveyStore();

  const handleValueChange = (value: string) => {
    setField("familyNum", "");
    if (!isTypeof<"yes" | "no" | "">(value)) return;
    setField("familyBundle", value);
    if (value === "no") {
      setField("familyNum", "1");
    }
  };

  return (
    <RadioGroup value={data.familyBundle} onValueChange={handleValueChange}>
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
