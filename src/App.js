import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import {
  createTheme,
  ThemeProvider
} from "@mui/material"

import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import About from "./components/About"
import Home from "./components/Home"
import Questionnaire from "./components/Questionnaire"
import MhtResults from "./components/MhtResults"
import SymptomQuestionnaire from "./components/SymptomQuestionnaire"

import { amber, teal } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f9f6ee",
    },
    reset: {
      main: amber[500],
      contrastText: "#ffffff",
    }
  }
})

const App = () => {
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues))
  }, [formValues])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/questionnaire" element={<Questionnaire setValues={setFormValues}/>} />
          <Route path="/results" element={<MhtResults values={formValues}/>} />
          <Route path="/symptoms" element={<SymptomQuestionnaire/>} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  )
}

export default App
