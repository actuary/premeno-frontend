import axios from "axios"
import { saveAs } from "file-saver"

export const getAuthToken = () => {
  const data = {
    "username": process.env.REACT_APP_API_USER,
    "password": process.env.REACT_APP_API_PSWD
  }

  return (
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth-token/`, 
        data, 
        { "Content-Type": "application/json" })
      .then(response => response.data.token)
      .catch(error => {
        console.log(`Error getting risk calculation ${error.reponse}`)
        throw error
      })
  )
}

export const getRiskCalculation = (data) => (
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/risk/`, 
      data
    )
    .then(response => response.data)
    .catch(error => {
      console.log(`Error getting risk calculation ${error.reponse}`)
      return {}
    })
)

export const getSymptomPDF = (data) => (
  retrievePDF(data, "questionnaire/", "SymptomQuestionnaire")
)

export const getRiskResultsPDF = (data) => (
  retrievePDF(data, "risk_report/", "RiskResults")
)

export const retrievePDF = (data, route, name) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/symptoms/${route}`, 
      data, 
      {
        headers: { "Content-Type": "application/json" },
        responseType: "blob"
      })
    .then(response => {
      const file = new Blob([response.data], { type: "application/pdf" })
      saveAs(file, `${name}.pdf`)
    })
    .catch(error => {
      console.log(error.response)
    })
}
