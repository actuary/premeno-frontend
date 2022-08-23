import {
  Paper,
  Typography,
  Grid,
  Divider,
} from "@mui/material"

const QuestionsAndAnswers = ({ qna }) => {
  console.log(qna)
  return (
    <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
      {qna && Object.keys(qna).length > 0 ?
        <>
          <Grid container>
            <Grid item xs={8}>
              <Typography
                variant="h4"
                component="p"
                color="primary"
              >
                Question:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                component="p"
                color="primary"
              >
                Answer:
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{ bgcolor: "primary.main" }} xs={12}>
              <Typography
                component="p"
                color="primary.contrastText"
              >
                About you
              </Typography>
              <Divider/>
            </Grid>
            {qna["about"].map( ({ question, answer}, idx) =>
              <Grid key={idx} item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {question}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {answer}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            )}
            <Grid item sx={{ bgcolor: "primary.main" }} xs={12}>
              <Typography
                component="p"
                color="primary.contrastText"
              >
                Reproductive Health
              </Typography>
              <Divider/>
            </Grid>
            {qna["repro"].map( ({ question, answer}, idx) =>
              <Grid key={idx} item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {question}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {answer}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            )}
            <Grid item sx={{ bgcolor: "primary.main" }} xs={12}>
              <Typography
                component="p"
                color="primary.contrastText"
              >
                Breast Cancer Risk
              </Typography>
              <Divider/>
            </Grid>
            {qna["bcrisk"].map( ({ question, answer}, idx) =>
              <Grid key={idx} item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {question}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="p"
                      color="primary"
                    >
                      {answer}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            )}
          </Grid>
        </> : <>No answers available</>
      }
    </Paper>
  )
}

export default QuestionsAndAnswers
