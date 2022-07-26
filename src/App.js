import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import Navbar from "./Navbar"
import Footer from "./components/Footer"
import Home from "./components/Home"
import PersonalDetails from "./components/PersonalDetails"
import MhtResults from "./components/MhtResults"

const App = () => {
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues))
  }, [formValues])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<Home />} />
        <Route path="/questionnaire" element={<PersonalDetails setValues={setFormValues}/>} />
        <Route path="/results" element={<MhtResults values={formValues}/>} />
        <Route path="/symptoms" element={<MhtResults values={formValues}/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
