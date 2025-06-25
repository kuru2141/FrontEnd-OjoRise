import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiPlan } from "@/types/plan";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface ItemSelectorProps {
  value: string;
  selectList: string[];
  handler: (value: string) => void;
  placehoder: string;
  isSelect: boolean;
}

function ItemSelector({ selectList, value, handler, isSelect, placehoder }: ItemSelectorProps) {
  if (isSelect)
    return (
      <Select onValueChange={handler} value={value}>
        <SelectTrigger className="text-5xl text-primary-medium border-primary-medium">
          <SelectValue placeholder={placehoder} className="h-[250px]" />
        </SelectTrigger>
        <SelectContent>
          {selectList.map((item, i) => (
            <SelectItem key={`select_${item}_${i}`} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

  const handleChange = (_: unknown, newValue: string | null) => {
    if (newValue) {
      handler(newValue);
    } else {
      handler("");
    }
  };

  return (
    <Autocomplete
      id={`test_select`}
      sx={{ width: 300 }}
      options={selectList}
      autoHighlight
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return (option as ApiPlan).name;
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" label={placehoder} />}
      onChange={handleChange}
      onInputChange={handleChange}
      value={value}
      inputValue={value}
    />
  );
}

export default memo(ItemSelector);
