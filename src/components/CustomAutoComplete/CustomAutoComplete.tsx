import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

const styles = () => ({
  autoCompleteRoot: {
    width: "100%",
    "& div.MuiAutocomplete-inputRoot.MuiInputBase-adornedEnd": {
      paddingRight: 0,
    },
  },
});

const filter = createFilterOptions<any>();

type Option = {
  title: string;
  value?: string;
  inputValue?: string;
};
type Props = {
  options: Option[];
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
};

const CustomAutoComplete = (props: Props) => {
  const { options, placeholder, name, register } = props;
  const [value, setValue] = useState<Option | null>(null);

  const sx = styles();

  return (
    <Autocomplete
      sx={sx.autoCompleteRoot}
      value={value}
      onChange={(_event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add ${inputValue}`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option: string | Option) => {
        if (typeof option === "string") {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => {
        let title = "";
        if (typeof option === "string") title = option;
        if (typeof option === "object") title = option.title;

        return <li {...props}>{title}</li>;
      }}
      freeSolo
      renderInput={(params) => {
        const isOpen = params.inputProps["aria-expanded"];
        return (
          <TextField
            variant="standard"
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: isOpen ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              ),
            }}
            label={placeholder}
            {...register(name)}
          />
        );
      }}
    />
  );
};

export default CustomAutoComplete;
