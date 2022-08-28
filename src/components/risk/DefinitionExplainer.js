import { Paper, Typography, } from "@mui/material"

const DefinitionExplainer = ({ riskText }) => (
  <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
    <Typography
      component="p"
      color="primary"
    >
      <strong>Background risk:</strong> This shows the estimated chance of {riskText} over the next 5 years, without the use of MHT.
    </Typography>
    <Typography
      component="p"
      color="primary"
    >
      <strong>Risk with MHT use:</strong> This shows the estimated chance of {riskText} over the next 5 years, if you decide to take MHT.
    </Typography>
    <br />
    <Typography
      component="p"
      color="primary"
    >
      <strong>Please note</strong> that these estimates are only a guide and should
      be discussed with your doctor. These estimates may not be accurate if you have 
      certain genes or heritage. They also might differ depending on the type of MHT you use, e.g. pills vs patches. 
      Please see the <a href="/about">about</a> page 
      for details on how these estimates were calculated.
    </Typography>
  </Paper>
)

export default DefinitionExplainer
