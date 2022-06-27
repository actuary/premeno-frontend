import {
  Paper, 
  Container,
  Typography,
  Grid, Box,
  Stack,
  Divider,
  createTheme, ThemeProvider
} from "@mui/material"

import { teal } from "@mui/material/colors"

import { Woman } from "@mui/icons-material"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    }
  }
})

const MhtResults = () => {
  const baselineRisk = 0.102
  const relativeRisk = 2.0
  const riskWithMHT = relativeRisk * baselineRisk
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Grid container align="center">
              <Grid item xs={3.9}>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                >
                  Baseline absolute risk (not on MHT)
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                >
                  {baselineRisk * 100}%
                </Typography>
              </Grid>
              <Divider orientation="vertical" />
              <Grid item xs={3.9}>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                >
                  Relative risk of MHT use
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                >
                  {relativeRisk}x
                </Typography>
              </Grid>
              <Divider orientation="vertical" />
              <Grid item xs={3.9}>
                <Typography
                  variant="h6"
                  component="p"
                  color="primary"
                >
                  Absolute risk with MHT use
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                >
                  {riskWithMHT*100}%
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
        <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
          <Typography
            variant="h6"
            component="p"
            color="teal"
          >
            Number of women with your attributes getting breast cancer 
            over 10 years
          </Typography>
          <Box container width="50%">
            <Grid container>
              {[...Array(100)].map((x, i) => {
                const color = (i < Math.ceil(baselineRisk*100) ? 
                  "red" : 
                  (i < Math.ceil(riskWithMHT*100) ? 
                    "orange" : 
                    "teal"))
                return (
                  <Grid key={i} item>
                    <Woman fontSize="small" style={{ color: color }}/>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default MhtResults
