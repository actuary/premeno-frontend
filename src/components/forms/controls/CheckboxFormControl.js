import { Controller } from "react-hook-form"

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material"

const CheckboxFormControl = ({ name, control, label, rules }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl fullWidth margin="normal">
          <FormGroup {...field}>
            <FormControlLabel
              control={
                <Checkbox checked={field.value}/>
              }
              label={label} />
          </FormGroup>
        </FormControl>
      )}
    />
  )
}

export default CheckboxFormControl
