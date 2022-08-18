import { Slider, FormControl } from "@mui/material"
import {Controller} from "react-hook-form"

const marks = [
  {
    value: 0,
    label: "Not at all",
  },
  {
    value: 1,
    label: "A little",
  },
  {
    value: 2,
    label: "Quite a bit",
  },
  {
    value: 3,
    label: "Extremely",
  },
]

const SymptomSlider = ({ name, control }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={0}
    render={({ field }) => (
      <FormControl fullWidth margin="normal">
        <Slider
          {...field}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={3}
        />
      </FormControl>)
    }
  />
)

export default SymptomSlider
