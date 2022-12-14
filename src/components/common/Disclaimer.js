import WarningAmberIcon from "@mui/icons-material/WarningAmber"

import {
  Paper,
  Container,
  Grid,
  Typography,
} from "@mui/material"

const Disclaimer = ({ maxWidth="md" }) => (
  <Container maxWidth={maxWidth}>
    <Paper variant="warning">
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <WarningAmberIcon color="error" fontSize="large"/> 
        </Grid>
        <Grid item xs={10}>
          <Typography
            component="p"
            color="darkred"
          >
            Mascot is currently in a pilot phase. See the <a href="/about">&quot;about&quot;</a> page for more. 
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Container>
)

export default Disclaimer
