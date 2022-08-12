import { Controller } from "react-hook-form"

import {
  FormControl,
  TextField,
} from "@mui/material"

import AdapterDateFns from "@mui/lab/AdapterDateFns"

import {
  LocalizationProvider,
  MobileDatePicker
} from "@mui/x-date-pickers"

const DateFormControl = ({ name, control, label, rules }) => {

  return (
    <LocalizationProvider
      dateAdapter={ AdapterDateFns }
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal">
            <MobileDatePicker
              {... field}
              label={label}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            >
            </MobileDatePicker>
          </FormControl>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateFormControl
