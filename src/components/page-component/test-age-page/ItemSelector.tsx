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
        <SelectTrigger className="text-[18px] border-gray-20 w-[180px] md:w-[270px] !h-[55px] dm:!h-[38px]">
          <SelectValue placeholder={placehoder} />
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
      sx={{ 
        width: {xs:180, md:270}, 
        height: {xs:55, md:38},
        '& .MuiInputBase-input': {
          fontSize: 18,
          fontWeight: 'bold',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',        
          backgroundColor: '#fff',                 
          '& fieldset': {
            borderColor: '#EAEAEA',  
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
          },
          '&:hover fieldset': {
            borderColor: '#EAEAEA',    
          },
          '&.Mui-focused fieldset': {
            borderColor: '#EAEAEA',   
          }
      }}}
      options={selectList}
      autoHighlight
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return (option as ApiPlan).name;
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" label="" />}
      onChange={handleChange}
      onInputChange={handleChange}
      value={value}
      inputValue={value}
    />
  );
}

export default memo(ItemSelector);
