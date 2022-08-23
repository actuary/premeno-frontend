import { Paper, Container, Typography, Grid, Button, ListItem, } from "@mui/material"
import { teal } from "@mui/material/colors"
import { Assignment, Psychology } from "@mui/icons-material"

import { boldText, italicize } from "./common/utils"

import { ReactComponent as Logo } from "../images/alt_logo_full.svg"

const About = () => (
  <Container maxWidth="md">
    <Paper
      style={{padding: 5, border: "1px solid teal", "marginTop": 10}}
    >
      <Grid container justifyItems="center">
        <Grid item xs={12} md={8}>
          <Logo width="100%" height="100%"/>
        </Grid>
      </Grid>
      <br/>
      <Typography component="p" color="primary" > {boldText("What is this tool?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        Mascot has been built to communicate
        the risks and benefits of taking menopausal hormone therapy (MHT), also known as
        hormone replacement therapy (HRT). It&apos;s aimed at women who are experiencing
        menopausal symptoms and are considering their options.
      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        For the moment, Mascot only calculates the change in the risk of breast cancer due to MHT. We hope to
        expand to other risks, such as a potential change in fracture risk, or potential change in VTE (blood clot)
        risk, to give a more holistic view of the risks and benefits of MHT.
      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        Mascot is in the pilot stage now, and as such not much work has been done in statistically validating
        the models used to calculate risk.
      </Typography>
      <br/>
      <Typography component="p" color="primary" > {boldText("Who is this for?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        This tool is for women of peri-menopausal or menopausal age. Currently this tool only allows 
        women that are 35 or older. 
      </Typography>
      <br/>
      <Typography component="p" color="primary" > {boldText("Who is this NOT for?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        There are a number of different reasons the tool might not calculate your risk accurately. For the moment, 
        this tool does not allow for some risk factors, such as:
      </Typography>
      <Typography
        component="ul"
        color="primary"
      >
        <ListItem sx={{ display: "list-item" }}> Being of Ashkenazi heritage, which potentially increases your breast cancer risk significantly</ListItem>
        <ListItem sx={{ display: "list-item" }}> Having genetic mutations (BRCA1/2) that potentially predispose you to higher risk of breast cancer</ListItem>
        <ListItem sx={{ display: "list-item" }}> Having previously had breast cancer</ListItem>
        <ListItem sx={{ display: "list-item" }}> Being under the age of 35 or over the age of 70 at time of starting treatment</ListItem>
      </Typography>
      <Typography
        component="p"
        color="primary"
      >
        If any of these apply to you, your actual risk profile may be significantly different to what is shown.
      </Typography>
      <br/>
      <Typography component="p" color="primary" > {boldText("How are the risk estimates calculated?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        There are two ways risk estimates have been estimated, using the freely available <a href="https://www.canrisk.org/">CanRisk</a> tool [1-3] or using a modified
        version of the Gail model [4].

      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        Please note that when calculating MHT risk, both of these models rely heavily on the Million Women Study (MWS) data, which 
        shows approximate doubling of risk when MHT formulations including both oestrogen and progestogen are taken, and a smaller but
        significant increase for MHT formulations containing oestrogen alone.
      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        {italicize("CanRisk")}
      </Typography>
      <Typography
        component="p"
        color="primary"
      >
        In this version, we make use of the <a href="https://www.canrisk.org/">CanRisk</a> tool web-services. We take the information you input to
        the form and use their tool to calculate breast cancer risk with and without MHT. This tool makes use of the Million Women Study to
        estimate the relative risk of MHT.
      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        {italicize("Modified Gail Model")} <br/>
      </Typography>
      <Typography
        component="p"
        color="primary"
      >
        In this model, we use the Gail model [4] to estimate your background breast cancer risk. For estimating the extra risk due to 
        MHT, we use the results of a recent Lancet paper [5]. This paper conducts a systematic review of available evidence from 
        observational studies. Much of its data is obtained from the Million Women study.
      </Typography>
      <br/>
      <Typography component="p" color="primary" > {boldText("How accurate are the risk estimates?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        As this is a pilot tool, we do not make claims about the statistical validity of these estimates. We must note that:
      </Typography>
      <Typography
        component="ul"
        color="primary"
      >
        <ListItem  sx={{ display: "list-item" }}> When using the CanRisk tool, we rely on the estimates provided by it. For MHT, this in turn relies on the Million Women Study, which is a large observational study. There are other sources which indicate different results.</ListItem>
        <ListItem  sx={{ display: "list-item" }}> When using the modified Gail model, we also rely on these estimates. The Gail model is based on an American population and is older than other breast cancer risk models, so may not be as applicable to your situation.
          Also, we rely on the Lancet paper below [5]. This shows no variation by risk factors, but this is based solely on observational studies. We did not have access to the raw data itself.</ListItem>
      </Typography>
      <br/>
      <Typography component="p" color="primary" > {boldText("Does this replace my doctor's advice?")} </Typography>
      <Typography
        component="p"
        color="primary"
      >
        {boldText("No!")} This tool intends to facilitate a discussion with your doctor, so that the right course of treatment can be determined that fits your particular needs and risk profile.
      </Typography>
      <br/>
      <Typography
        component="p"
        color="primary"
      >
        {boldText("References")} <br/>
        The CanRisk tool is supported by grant PPRPGM-Nov20\100002 from Cancer Research UK. <br/><br/>

        [1] Carver, Tim et al. &quot;CanRisk Tool-A Web Interface for the Prediction of Breast and Ovarian Cancer Risk and the Likelihood of Carrying Genetic Pathogenic Variants.&quot; Cancer epidemiology, biomarkers & prevention : a publication of the American Association for Cancer Research, cosponsored by the American Society of Preventive Oncology vol. 30,3 (2021): 469-473. doi:10.1158/1055-9965.EPI-20-1319 <br/><br/>
        [2] Lee, Andrew et al. &quot;BOADICEA: a comprehensive breast cancer risk prediction model incorporating genetic and nongenetic risk factors&quot; Genetics in Medicine, Volume 21, Issue 8, 1708 - 1718 <br/><br/>
        [3] Archer, S et al. &quot;Evaluating clinician acceptability of the prototype CanRisk tool for predicting risk of breast and ovarian cancer: A multi-methods study.&quot; PLOS ONE 15(3) (2020): e0229999. https://doi.org/10.1371/journal.pone.0229999 <br/><br/>
        [4] Gail, Mitchell H et al. &quot;Projecting individualized probabilities of developing breast cancer for white females who are being ex- amined annually.&quot;JNCI : Journal of the National Cancer Institute, 81(24):1879– 1886, (1989). ISSN 0027-8874.  <br/><br/>
        [5] Goldbohm, R. Alexana et al. &quot;Type and timing of menopausal hormone therapy and breast cancer risk: individual participant meta-analysis of the worldwide epidemiological evidence.&quot; The Lancet, 394:1159–1168, 9 2019. ISSN 0140-6736. doi: 10.1016/S0140-6736(19)31709-X <br/><br/>
      </Typography>
      <br/>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          <Button
            href="/questionnaire"
            style={{background: teal[500], padding: 5, border: "1px solid teal", marginTop: 10, textTransform: "none", height: "90%"}}
            fullWidth
          >
            <Grid container alignItems="center">
              <Assignment color="secondary" fontSize="large"/>
              <Typography color="white" align="center">
                Assess my risk
              </Typography>
            </Grid>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            style={{background: teal[500], padding: 5, border: "1px solid teal", marginTop: 10, textTransform: "none", height: "90%"}}
            href="/symptoms"
            fullWidth
          >
            <Grid container alignItems="center">
              <Psychology color="secondary" fontSize="large"/>
              <Typography color="white" align="center">
                Assess my symptoms
              </Typography>
            </Grid>
          </Button>
        </Grid>
      </Grid>
      <br/>
    </Paper>
  </Container>
)

export default About
