import {
  FormControl, 
  Select, 
  InputLabel, 
  MenuItem,
  Divider
} from "@mui/material"

const SelectAnswer = ({ values, name, handleFormChange }) => (
  <div>
    <h2>{values[name].label}</h2>
    <FormControl fullWidth margin="normal">
      <InputLabel id={name}>{values[name].label}</InputLabel>
      <Select
        labelId={name}
        name={name}
        value={values[name].value}
        onChange={handleFormChange(name)}
        label={values[name].label}
      >
        {values[name].choices.map(c => <MenuItem key={c.label} value={c.value}>{c.label}</MenuItem>)}
      </Select>
    </FormControl>
    <Divider/>
  </div>
)

export default SelectAnswer
