import {
  FormControl, 
  Divider,
  TextField,
  Typography,
  Grid
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
    <Grid container alignItems="center">
      <Grid item sm={6}>
        <Typography component="h6" variant="h6" align="left" color="teal">
          {values[name].label}
        </Typography>
      </Grid>
      <Grid item sm={6}>
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
      </Grid>
      <Divider/>
    </Grid>
  )
}

export default DateAnswer
