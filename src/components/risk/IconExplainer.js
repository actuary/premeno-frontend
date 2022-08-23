import { Typography, Grid, Card, CardContent } from "@mui/material"

import { Woman } from "@mui/icons-material"

const IconExplainer = ({ anyway_risk, extra_risk, no_risk }) => (
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
          {no_risk} are likely not to get breast cancer whether they
          used menopausal hormone therapy or not
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
          {anyway_risk} would have likely gotten breast cancer
          whether they used menopausal hormone therapy or not
        </Typography>
      </CardContent>
    </Grid>
    <Grid item component={Card} xs={12} md={4}>
      <CardContent>
        <Woman fontSize="large" style={{ color: "red" }}/>
        <Typography
          variant="h8"
          component="p"
          color="red"
          fontFamily="monospace"
        >
          {extra_risk} more are likely to get breast cancer
          due to menopausal hormone therapy who wouldn&apos;t have otherwise
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
)

export default IconExplainer
