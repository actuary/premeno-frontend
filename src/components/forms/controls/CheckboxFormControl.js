import { Controller } from "react-hook-form"

import {
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material"

const CheckboxFormControl = ({ name, control, label, rules }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultChecked={true} 
      render={({ field }) => (
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            control={
              <Checkbox defaultChecked={true} checked={field.value}/>
            }
            label={label} />
        </FormControl>
      )}
    />
  )
}

export default CheckboxFormControl
