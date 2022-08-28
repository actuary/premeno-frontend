import { Typography, Grid, Card, CardContent } from "@mui/material"

import { Woman } from "@mui/icons-material"

const IconExplainer = ({ riskWithOrWithout, riskDueTo, noRisk, riskActionText, secondaryColour="red" }) => {
  return (
    <Grid container align="center" spacing={1}>
      <Grid item component={Card} xs={12} md={4}>
        <CardContent>
          <Woman fontSize="large" style={{ color: "teal" }}/>
          <Typography
            variant="h8"
            component="p"
            color="teal"
            fontFamily="monospace"
          >
            {noRisk} are likely NOT to {riskActionText} whether they used MHT or not
          </Typography>
        </CardContent>
      </Grid>
      <Grid item component={Card} xs={12} md={4}>
        <CardContent>
          <Woman fontSize="large" style={{ color: "black" }}/>
          <Typography
            variant="h8"
            component="p"
            color="black"
            fontFamily="monospace"
          >
            {riskWithOrWithout} are likely {riskActionText} whether they used MHT or not
          </Typography>
        </CardContent>
      </Grid>
      <Grid item component={Card} xs={12} md={4}>
        <CardContent>
          <Woman fontSize="large" style={{ color: secondaryColour }}/>
          <Typography
            variant="h8"
            component="p"
            color={secondaryColour}
            fontFamily="monospace"
          >
            {Math.abs(riskDueTo)} {riskDueTo < 0 ? "fewer" : "more" } are likely {riskActionText} due to MHT use who {riskDueTo < 0 ? "might" : "mightn't" } have otherwise
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  )
}

export default IconExplainer
