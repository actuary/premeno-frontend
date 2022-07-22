import { Controller } from "react-hook-form"

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material"

const RadioFormControl = ({ name, control, label, choices, rules }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl fullWidth margin="normal">
          <FormLabel id={name.concat("_radio")}>{label}</FormLabel>
          <RadioGroup
            {...field}
            error={!!fieldState.error}
          >
            {choices.map(c =>
              <FormControlLabel
                key={c.label}
                value={c.value}
                control={<Radio />}
                label={c.label}
              />
            )}
          </RadioGroup>
        </FormControl>
      )}
    />
  )
}

export default RadioFormControl
