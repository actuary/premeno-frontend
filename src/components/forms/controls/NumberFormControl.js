import { Controller } from "react-hook-form"

import {
  FormControl,
  TextField,
} from "@mui/material"

const NumberFormControl = ({ name, control, label, rules, disabled=false }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl fullWidth margin="normal">
          <TextField
            {...field}
            type="number"
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  )
}

export default NumberFormControl
