import { Input } from "@/components/ui/input";
import { useSurveyStore } from "@/stores/surveyStore";

export function PlanPrice() {
  const { data, setField } = useSurveyStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setField("planPrice", value);
  };
  
  return (
    <div>
      <p className="font-bold text-[18px] mb-3 mt-4">요금제 금액 선택</p>
      <Input
        className="relative w-[260px] h-[50px] focus:outline-none"
        type="number"
        inputMode="numeric"
        placeholder="요금제 가격을 입력해 주세요"
        value={data.planPrice}
        onChange={handleChange}
        min={0}
        step={1} />
    </div>

  );
}
