import {
  FormControl, 
  Divider,
  TextField,
} from "@mui/material"


import AdapterDateFns from "@mui/lab/AdapterDateFns"

import { 
  LocalizationProvider, 
  MobileDatePicker
} from "@mui/x-date-pickers"

const DateAnswer = ({ values, name, handleFormChange }) => {
  // Date pickers return the value instead of the event
  const handleDateFormChange = (name) => {
    const fn = handleFormChange(name)
    return (value) => {
      const e = {target: {value: value}}
      return fn(e)
    }
  }
  
  return (
    <div>
      <h2>{values[name].label}</h2>
      <FormControl fullWidth margin="normal">
        <LocalizationProvider dateAdapter={ AdapterDateFns }>
          <MobileDatePicker
            label="dd/MM/yyyy"
            inputFormat="dd/MM/yyyy"
            value={values[name].value}
            onChange={handleDateFormChange(name)}
            renderInput={(params) => <TextField {...params} />}
          >
          </MobileDatePicker>
        </LocalizationProvider>
      </FormControl>
      <Divider/>
    </div>
  )
}

export default DateAnswer
