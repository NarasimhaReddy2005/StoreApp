import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectProps,
} from "@mui/material";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";
import { useState } from "react";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  items: string[];
} & UseControllerProps<T> &
  SelectProps;

export default function AppSelectInput<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });
  const [showInput, setShowInput] = useState(false);

  const handleChange = (value: string) => {
    if (value === "Other") {
      setShowInput(true);
      field.onChange("");
    } else {
      setShowInput(false);
      field.onChange(value);
    }
  };

  if (showInput) {
    return (
      <TextField
        fullWidth
        label={props.label}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        onBlur={() => {
          if (!field.value) {
            setShowInput(false);
          }
        }}
      />
    );
  }

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ""}
        label={props.label}
        onChange={(e) => handleChange(e.target.value as string)}
      >
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
        <MenuItem value="Other">Other</MenuItem>
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
