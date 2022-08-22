import WarningAmberIcon from "@mui/icons-material/WarningAmber"

import {
  Paper,
  Container,
  Grid,
  Typography,
} from "@mui/material"

const Disclaimer = () => (
  <Container maxWidth="md">
    <Paper
      style={{padding: 5, border: "1px solid teal", "marginTop": 10, background: "#F5F5DC"}}
    >
      <Grid container alignItems="center">
        <Grid item sx={1}>
          <WarningAmberIcon color="error" fontSize="large"/> 
        </Grid>
        <Grid item sx={11}>
          <Typography
            component="p"
            color="darkred"
          >
            Mascot is currently in a pilot phase.See the <a href="/about">&quot;about&quot;</a> page for more. 
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Container>
)

export default Disclaimer
