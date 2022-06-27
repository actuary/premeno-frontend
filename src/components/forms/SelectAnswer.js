import {
  FormControl, 
  Select, 
  InputLabel, 
  MenuItem,
  Divider,
  Typography,
  Grid,
} from "@mui/material"

const SelectAnswer = ({ values, name, handleFormChange }) => (
  <Grid container alignItems="center">
    <Grid item sm={6}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {values[name].label}
      </Typography>
    </Grid>
    <Grid item sm={6} width="100%">
      <FormControl fullWidth margin="normal">
        <InputLabel id={name}>{values[name].inputLabel}</InputLabel>
        <Select
          labelId={name}
          name={name}
          value={values[name].value}
          onChange={handleFormChange(name)}
          label={values[name].inputLabel}
        >
          {values[name].choices.map(c => <MenuItem key={c.label} value={c.value}>{c.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Grid>
    <Divider/>
  </Grid>
)

export default SelectAnswer
