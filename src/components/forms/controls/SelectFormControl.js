import React from "react"
import { Controller } from "react-hook-form"

import { Select, MenuItem, FormControl, FormHelperText, InputLabel } from "@mui/material"

const SelectFormControl = ({ name, control, label, choices, rules }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            error={!!fieldState.error}
          >
            {choices.map(c => <MenuItem key={c.label} value={c.value}>{c.label}</MenuItem>)
            }
          </Select>
          {!!fieldState.error && <FormHelperText><span style={{ color: "red" }}>{fieldState.error?.message}</span></FormHelperText>}
        </FormControl>)
      }
    />
  )
}

export default SelectFormControl
