import { Paper, Typography, Grid, Card } from "@mui/material"

import { Woman } from "@mui/icons-material"

import IconArray from "./IconArray"
import IconExplainer from "./IconExplainer"

const RiskGraphicDisplay = ({baselineRisk, mhtRisk, riskActionText}) => {
  const numberOfWomen = 1000
  const length = 25
  const width = 40

  return (
    <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
      <Typography
        variant="h6"
        component="p"
        color="teal"
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
          />
        </Grid>
        <Grid item component={Card} xs={12} md={12}>
          <IconArray
            Icon={Woman}
            length={length}
            width={width}
            black={baselineRisk}
            red={mhtRisk}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RiskGraphicDisplay
