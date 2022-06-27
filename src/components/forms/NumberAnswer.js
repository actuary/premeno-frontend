import {
  FormControl, 
  Divider,
  TextField,
  Typography,
  Grid
} from "@mui/material"


const NumberAnswer = ({ values, name, handleFormChange }) => (
  <Grid container alignItems="center">
    <Grid item sm={6}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {values[name].label}
      </Typography>
    </Grid>
    <Grid item sm={6}>
      <FormControl fullWidth margin="normal">
        <TextField
          name={name}
          type="number"
          value={values[name].value}
          onChange={handleFormChange(name)}
          label={values[name].inputLabel}
        >
        </TextField>
      </FormControl>
    </Grid>
    <Divider/>
  </Grid>
)

export default NumberAnswer
