import { Paper, Typography, Grid, Card } from "@mui/material"

import { Woman } from "@mui/icons-material"

import IconArray from "./IconArray"
import IconExplainer from "./IconExplainer"

const RiskGraphicDisplay = ({baselineRisk, mhtRisk, riskActionText}) => {
  const numberOfWomen = 1000
  const length = 25
  const width = 40

  return (
    <Paper variant="main">
      <Typography
        variant="h6"
        component="p"
        color="primary"
      >
        For {numberOfWomen} women with your attributes over 5 years
      </Typography>
      <Grid container align="center">
        <Grid item component={Card} xs={12} md={12}>
          <IconExplainer
            noRisk={Math.round((1 - mhtRisk) * numberOfWomen)}
            riskDueTo={Math.round((mhtRisk - baselineRisk) * numberOfWomen)}
            riskWithOrWithout={Math.round(baselineRisk * numberOfWomen)}
            riskActionText={riskActionText}
            secondaryColour={mhtRisk - baselineRisk < 0 ? "purple": "red"}
          />
        </Grid>
        <Grid item component={Card} xs={12} md={12}>
          <IconArray
            Icon={Woman}
            length={length}
            width={width}
            black={mhtRisk - baselineRisk < 0 ? mhtRisk: baselineRisk}
            red={mhtRisk - baselineRisk < 0 ? baselineRisk: mhtRisk}
            secondaryColour={mhtRisk - baselineRisk < 0 ? "purple": "red"}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RiskGraphicDisplay
