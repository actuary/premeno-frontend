import { Controller } from "react-hook-form"

import {
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material"

const CheckboxFormControl = ({ name, control, label, rules }) => {

  return (
    <FormControl fullWidth margin="normal">
      <FormControlLabel
        label={label} 
        control={
          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={true}
            render={({ field }) => (
              <Checkbox 
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        }
      />
    </FormControl>
  )
}

export default CheckboxFormControl
