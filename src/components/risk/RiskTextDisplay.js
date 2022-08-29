import {
  Paper,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
} from "@mui/material"

const RiskTextDisplay = ({ baseline, total_risk , years}) => {

  return (
    <Paper variant="main">
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Grid container align="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card variant="risk">
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                >
                  {years} year background risk
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                >
                  {(baseline * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="risk">
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                >
                  {years} year risk with MHT use
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                >
                  {(total_risk*100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  )
}

export default RiskTextDisplay
